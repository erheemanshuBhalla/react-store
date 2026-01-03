using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactStore.Application.DTOs.Product;
using ReactStore.Application.Interfaces;

namespace ReactStore.API.Controllers
{
   
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IWebHostEnvironment _env;

        public ProductsController(IProductRepository repo,IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] ProductSearchDto filter)
        {
            var products = await _repo.SearchAsync(filter);
            return Ok(products);
        }

        

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateProductDto dto)
        {
            string? imageUrl = null;

            if (dto.Image != null)
            {
                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var folder = Path.Combine(_env.WebRootPath, "uploads/products");

                Directory.CreateDirectory(folder);

                var filePath = Path.Combine(folder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await dto.Image.CopyToAsync(stream);

                imageUrl = $"/uploads/products/{fileName}";
            }

            var productId = await _repo.CreateAsync(dto, imageUrl);
            await _repo.UpdateCategoriesAsync(productId, dto.CategoryIds);

            return Ok(new { productId });
        }
        [HttpGet("{id}/categories")]
        public async Task<IActionResult> GetCategories(int id)
        {
            var ids = await _repo.GetCategoryIdsByProductIdAsync(id);
            return Ok(ids);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateProductDto dto)
        {
            string? imageUrl = null;

            if (dto.Image != null)
            {
                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var folder = Path.Combine(_env.WebRootPath, "uploads/products");

                Directory.CreateDirectory(folder);

                var filePath = Path.Combine(folder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await dto.Image.CopyToAsync(stream);

                imageUrl = $"/uploads/products/{fileName}";
            }

            await _repo.UpdateAsync(id, dto, imageUrl);
            await _repo.UpdateCategoriesAsync(id, dto.CategoryIds);

            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _repo.GetAllAsync());

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
            => Ok(await _repo.GetByIdAsync(id));
    }


}
