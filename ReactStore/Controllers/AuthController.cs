using Microsoft.AspNetCore.Mvc;
using ReactStore.Application.DTOs.Auth;
using ReactStore.Application.Interfaces;
using ReactStore.Domain;
using ReactStore.Infrastructure;

namespace ReactStore.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;

    public AuthController(IAuthRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _repo.GetByEmailAsync(dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });

        var token = JwtTokenGenerator.Generate(user, _config);
        return Ok(new
        {
            token,
            userId = user.Id,
            email = user.Email,
            role = user.Role
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var existing = await _repo.GetByEmailAsync(dto.Email);
        if (existing != null)
            return BadRequest(new { message = "Email already registered." });

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "User"
        };

        var id = await _repo.RegisterAsync(user);
        return Ok(new { userId = id, message = "Registered successfully." });
    }
}
