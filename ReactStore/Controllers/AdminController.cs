using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactStore.Application.Interfaces;
using ReactStore.Infrastructure;

namespace ReactStore.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _repo;

        public AdminController(IAdminRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            return Ok(await _repo.GetDashboardAsync());
        }
    }

}
