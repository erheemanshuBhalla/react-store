using Dapper;
using ReactStore.Application.DTOs.Product;
using ReactStore.Application.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DapperContext _context;

        public CategoryRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(string name)
        {
            using var conn = _context.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                @"INSERT INTO Categories (Name)
              VALUES (@Name);
              SELECT CAST(SCOPE_IDENTITY() as int);",
                new { Name = name });
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<CategoryDto>(
                "SELECT Id, Name FROM Categories");
        }
    }

}
