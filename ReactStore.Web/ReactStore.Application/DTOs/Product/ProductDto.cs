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

    public record ProductDto(
        int Id,
        string Name,
        string? Description,
        decimal Price,
        List<CategoryDto> Categories
    );
    public record CategoryDto(int Id, string Name);

}
