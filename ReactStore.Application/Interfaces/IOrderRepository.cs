using ReactStore.Application.DTOs.Order;
using ReactStore.Domain;

namespace ReactStore.Application.Interfaces
{
    public interface IOrderRepository
    {
        Task<int> CreateOrderAsync(int userId, CreateOrderDto dto);
        Task<IEnumerable<Order>> GetUserOrdersAsync(int userId);
        Task<OrderDetailsDto?> GetOrderDetailsAsync(int orderId, int userId);
        Task UpdateOrderStatusAsync(int orderId, string status);
    }

}
