using Dapper;
using ReactStore.Application.Interfaces;
using ReactStore.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReactStore.Application.DTOs.Product;

namespace ReactStore.Infrastructure
{
    

    public class ProductRepository : IProductRepository
    {
        private readonly DapperContext _context;

        public ProductRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> SearchAsync(ProductSearchDto f)
        {
            var sql = """
        SELECT DISTINCT p.*
        FROM Products p
        LEFT JOIN ProductCategories pc ON p.Id = pc.ProductId
        WHERE (@MinPrice IS NULL OR p.Price >= @MinPrice)
          AND (@MaxPrice IS NULL OR p.Price <= @MaxPrice)
          AND (@CategoryId IS NULL OR pc.CategoryId = @CategoryId)
        """;

            sql += f.Sort switch
            {
                "price_asc" => " ORDER BY p.Price ASC",
                "price_desc" => " ORDER BY p.Price DESC",
                "name_asc" => " ORDER BY p.Name ASC",
                "name_desc" => " ORDER BY p.Name DESC",
                _ => " ORDER BY p.Id DESC"
            };

            sql += " OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            using IDbConnection conn = _context.CreateConnection();

            return await conn.QueryAsync<Product>(sql, new
            {
                f.MinPrice,
                f.MaxPrice,
                f.CategoryId,
                Offset = (f.Page - 1) * f.PageSize,
                f.PageSize
            });
        }

        public async Task<int> CreateAsync(CreateProductDto dto, string? imageUrl)
        {
            using var conn = _context.CreateConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();

            var productId = await conn.ExecuteScalarAsync<int>(
                @"INSERT INTO Products (Name, Description, Price,Stock, ImageUrl)
              VALUES (@Name, @Description, @Price,@Stock,@ImageUrl);
              SELECT CAST(SCOPE_IDENTITY() as int);",
                dto, tx);

            foreach (var catId in dto.CategoryIds)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO ProductCategories VALUES (@ProductId, @CategoryId)",
                    new { ProductId = productId, CategoryId = catId }, tx);
            }

            tx.Commit();
            return productId;
        }

        public async Task UpdateAsync(int id, UpdateProductDto dto, string? imageUrl)
        {
            using var conn = _context.CreateConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();

            await conn.ExecuteAsync(
                @"UPDATE Products SET
                Name = @Name,
                Description = @Description,
                Price = @Price,
    Stock = @Stock,
    ImageUrl = ISNULL(@ImageUrl, ImageUrl)
              WHERE Id = @Id",
                new { dto.Name, dto.Description, dto.Price, Id = id }, tx);

            await conn.ExecuteAsync(
                "DELETE FROM ProductCategories WHERE ProductId = @Id",
                new { Id = id }, tx);

            foreach (var catId in dto.CategoryIds)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO ProductCategories VALUES (@Id, @CategoryId)",
                    new { Id = id, CategoryId = catId }, tx);
            }

            tx.Commit();
        }
        public async Task<IEnumerable<int>> GetCategoryIdsByProductIdAsync(int productId)
        {
            using IDbConnection conn = _context.CreateConnection();

            return await conn.QueryAsync<int>(
                "SELECT CategoryId FROM ProductCategories WHERE ProductId = @productId",
                new { productId }
            );
        }
        public async Task UpdateCategoriesAsync(int productId, IEnumerable<int> categoryIds)
        {
            using IDbConnection conn = _context.CreateConnection();

            await conn.ExecuteAsync(
                "DELETE FROM ProductCategories WHERE ProductId = @productId",
                new { productId }
            );

            foreach (var categoryId in categoryIds)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO ProductCategories (ProductId, CategoryId) VALUES (@productId, @categoryId)",
                    new { productId, categoryId }
                );
            }
        }
        public async Task DeleteAsync(int id)
        {
            using var conn = _context.CreateConnection();
            await conn.ExecuteAsync(
                "DELETE FROM Products WHERE Id = @Id", new { Id = id });
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            using var conn = _context.CreateConnection();

            var sql = """
        SELECT p.Id, p.Name, p.Description, p.Price,
               c.Id, c.Name
        FROM Products p
        LEFT JOIN ProductCategories pc ON p.Id = pc.ProductId
        LEFT JOIN Categories c ON pc.CategoryId = c.Id
        """;

            var dict = new Dictionary<int, ProductDto>();

            await conn.QueryAsync<ProductDto, CategoryDto, ProductDto>(
                sql,
                (p, c) =>
                {
                    if (!dict.TryGetValue(p.Id, out var prod))
                    {
                        prod = p with { Categories = new List<CategoryDto>() };
                        dict.Add(p.Id, prod);
                    }

                    if (c != null)
                        prod.Categories.Add(c);

                    return prod;
                },
                splitOn: "Id");

            return dict.Values;
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
            => (await GetAllAsync()).FirstOrDefault(p => p.Id == id);
    }

}

