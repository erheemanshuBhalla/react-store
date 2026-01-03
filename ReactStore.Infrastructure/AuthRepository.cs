using Dapper;
using ReactStore.Application.Interfaces;
using ReactStore.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DapperContext _context;

        public AuthRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var sql = "SELECT * FROM Users WHERE Email = @Email";
            using var conn = _context.CreateConnection();
            return await conn.QuerySingleOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<int> RegisterAsync(User user)
        {
            var sql = """
        INSERT INTO Users (Email, PasswordHash)
        VALUES (@Email, @PasswordHash);
        SELECT CAST(SCOPE_IDENTITY() as int);
        """;

            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(sql, user);
        }
    }

}
