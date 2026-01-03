using Dapper;
using ReactStore.Application.DTOs.Order;
using System.Data;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure
{
    public class AdminRepository
    {
        private readonly IDbConnection _db;

        public AdminRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            using var multi = await _db.QueryMultipleAsync(
                "sp_AdminDashboard",
                commandType: CommandType.StoredProcedure
            );

            var kpi = await multi.ReadSingleAsync<dynamic>();
            var recentOrders = await multi.ReadAsync<OrderSummaryDto>();

            return new AdminDashboardDto
            {
                TotalOrders = kpi.TotalOrders,
                TotalRevenue = kpi.TotalRevenue,
                TotalUsers = kpi.TotalUsers,
                TotalProducts = kpi.TotalProducts,
                RecentOrders = recentOrders
            };
        }
    }

}
