using Dapper;
using ReactStore.Application.DTOs.Order;
using ReactStore.Application.Interfaces;
using System.Data;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DapperContext _context;

        public AdminRepository(DapperContext context)
        {
            _context = context;
        }

       

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            using var conn = _context.CreateConnection();
            using var multi = await conn.QueryMultipleAsync(
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
