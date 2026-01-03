using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactStore.Application.Interfaces;

namespace ReactStore.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _repo;

        public CategoriesController(ICategoryRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string name)
            => Ok(await _repo.CreateAsync(name));

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _repo.GetAllAsync());
    }

}
