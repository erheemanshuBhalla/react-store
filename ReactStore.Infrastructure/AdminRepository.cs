using Dapper;
using ReactStore.Application.DTOs.Order;
using System.Data;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure;

public class AdminRepository
{
    private readonly DapperContext _context;

    public AdminRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<AdminDashboardDto> GetDashboardAsync()
    {
        using var conn = _context.CreateConnection();
        conn.Open();

        // Inline queries instead of stored proc (no sp_AdminDashboard exists yet)
        var sql = @"
            SELECT
                (SELECT COUNT(*) FROM Orders)       AS TotalOrders,
                (SELECT ISNULL(SUM(TotalAmount),0) FROM Orders) AS TotalRevenue,
                (SELECT COUNT(*) FROM Users)        AS TotalUsers,
                (SELECT COUNT(*) FROM Products)     AS TotalProducts;

            SELECT TOP 10 Id, TotalAmount, Status, CreatedAt
            FROM Orders
            ORDER BY CreatedAt DESC;";

        using var multi = await conn.QueryMultipleAsync(sql);

        var kpi = await multi.ReadSingleAsync<dynamic>();
        var recentOrders = await multi.ReadAsync<OrderSummaryDto>();

        return new AdminDashboardDto
        {
            TotalOrders = (int)kpi.TotalOrders,
            TotalRevenue = (decimal)kpi.TotalRevenue,
            TotalUsers = (int)kpi.TotalUsers,
            TotalProducts = (int)kpi.TotalProducts,
            RecentOrders = recentOrders
        };
    }
}
