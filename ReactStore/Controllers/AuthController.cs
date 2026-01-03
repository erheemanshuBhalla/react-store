using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReactStore.Application.DTOs.Auth;
using ReactStore.Application.Interfaces;
using ReactStore.Infrastructure;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReactStore.API.Controllers
{
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
            var d = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized();

            var token = JwtTokenGenerator.Generate(user, _config);
            //return Ok(new { token,user.Email,user.Role,user.Id });
            return Ok(new
            {
                token = token,
                userId = user.Id,
                email = user.Email,
                role = user.Role   // ✅ SEND ROLE TO FRONTEND
            });
        }
        [HttpGet("generate-hash")]
        public IActionResult GenerateHash()
        {
            var password = "MyPass@123";
            var hash = BCrypt.Net.BCrypt.HashPassword(password, 11);

            return Ok(new
            {
                password,
                hash
            });
        }
    }

}
