namespace ReactStore.Application.DTOs.Order
{
    public record CreateOrderDto(
    List<CreateOrderItemDto> Items
);
    public class AdminDashboardDto
    {
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalUsers { get; set; }
        public int TotalProducts { get; set; }
        public IEnumerable<OrderSummaryDto> RecentOrders { get; set; }
    }

    public class OrderSummaryDto
    {
        public int OrderId { get; set; }
        public string UserEmail { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }





}
