using ReactStore.Application.DTOs.Product;
using ReactStore.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Application.Interfaces
{
    public interface IProductRepository
    {
        /*Task<IEnumerable<Product>> SearchAsync(
            decimal? minPrice,
            decimal? maxPrice,
            int? categoryId,
            string? sort);*/
        Task<IEnumerable<Product>> SearchAsync(ProductSearchDto filter);
        Task<int> CreateAsync(CreateProductDto dto, string? imageUrl);
        Task UpdateAsync(int id, UpdateProductDto dto, string? imageUrl);
        Task UpdateCategoriesAsync(int productId, IEnumerable<int> categoryIds);

        Task<IEnumerable<int>> GetCategoryIdsByProductIdAsync(int productId);

        Task DeleteAsync(int id);
        Task<ProductDto?> GetByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetAllAsync();
    }

}
