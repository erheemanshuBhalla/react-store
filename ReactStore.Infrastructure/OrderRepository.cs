namespace ReactStore.Infrastructure
{
    using Dapper;
    using ReactStore.Application.DTOs.Order;
    using ReactStore.Application.Interfaces;
    using ReactStore.Domain;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;

    public class OrderRepository : IOrderRepository
    {
        private readonly DapperContext _context;

        public OrderRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<int> CreateOrderAsync(int userId, CreateOrderDto dto)
        {
            using var conn = _context.CreateConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();

            try
            {
                var total = dto.Items.Sum(i => i.Price * i.Quantity);

                var orderId = await conn.ExecuteScalarAsync<int>(
                    @"INSERT INTO Orders (UserId, TotalAmount, Status)
                  VALUES (@UserId, @Total, 'Pending');
                  SELECT CAST(SCOPE_IDENTITY() as int);",
                    new { UserId = userId, Total = total },
                    tx
                );

                foreach (var item in dto.Items)
                {
                    await conn.ExecuteAsync(
                        @"INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
                      VALUES (@OrderId, @ProductId, @Quantity, @Price)",
                        new
                        {
                            OrderId = orderId,
                            item.ProductId,
                            item.Quantity,
                            item.Price
                        },
                        tx
                    );
                }

                tx.Commit();
                return orderId;
            }
            catch
            {
                tx.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<Order>> GetUserOrdersAsync(int userId)
        {
            using var conn = _context.CreateConnection();

            return await conn.QueryAsync<Order>(
                "SELECT * FROM Orders WHERE UserId = @UserId ORDER BY CreatedAt DESC",
                new { UserId = userId }
            );
        }
        public async Task<OrderDetailsDto?> GetOrderDetailsAsync(int orderId, int userId)
        {
            using var conn = _context.CreateConnection();

            var sql = @"
        SELECT Id, TotalAmount, Status, CreatedAt
        FROM Orders
        WHERE Id = @OrderId AND UserId = @UserId;

        SELECT ProductId, Quantity, Price
        FROM OrderItems
        WHERE OrderId = @OrderId;
    ";

            using var multi = await conn.QueryMultipleAsync(sql, new
            {
                OrderId = orderId,
                UserId = userId
            });

            var order = await multi.ReadSingleOrDefaultAsync<OrderDetailsDto>();
            if (order == null) return null;

            var items = (await multi.ReadAsync<CreateOrderItemDto>()).ToList();

            return order with { Items = items };
        }
        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            using var conn = _context.CreateConnection();

            await conn.ExecuteAsync(
                "UPDATE Orders SET Status = @Status WHERE Id = @OrderId",
                new { Status = status, OrderId = orderId }
            );
        }


    }

}
