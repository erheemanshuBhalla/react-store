using ReactStore.Application.DTOs.Order;

namespace ReactStore.Application.Interfaces
{
    public interface IAdminRepository
    {
        Task<AdminDashboardDto> GetDashboardAsync();
    }
}
