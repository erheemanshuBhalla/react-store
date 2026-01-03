using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Application.DTOs.Product
{
    // Altaliza.Application/DTOs/Products/ProductSearchDto.cs
    public record CreateProductDto(
    string Name,
    string? Description,
    decimal Price,
    List<int> CategoryIds,
        int Stock,

   

    // 🔹 NEW
    IFormFile? Image 
);

    public record UpdateProductDto(
        string Name,
        string? Description,
        decimal Price,
        List<int> CategoryIds, IFormFile? Image , int Stock
    );

    
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public decimal Price { get; set; }
        public List<CategoryDto> Categories { get; set; }
    }
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = default!;
    }

}
