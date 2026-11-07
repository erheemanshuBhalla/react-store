using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactStore.Infrastructure;

namespace ReactStore.API.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly AdminRepository _repo;

    public AdminController(AdminRepository repo)
    {
        _repo = repo;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
        => Ok(await _repo.GetDashboardAsync());
}
