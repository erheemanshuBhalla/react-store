using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactStore.Application.DTOs.Order;
using ReactStore.Application.Interfaces;

namespace ReactStore.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repo;

        public OrdersController(IOrderRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);

            var orderId = await _repo.CreateOrderAsync(userId, dto);
            return Ok(new { orderId });
        }

        [HttpGet]
        public async Task<IActionResult> MyOrders()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);

            return Ok(await _repo.GetUserOrdersAsync(userId));
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> Details(int orderId)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);

            var order = await _repo.GetOrderDetailsAsync(orderId, userId);

            if (order == null) return NotFound();

            return Ok(order);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateStatus(
    int orderId,
    UpdateOrderStatusDto dto)
        {
            await _repo.UpdateOrderStatusAsync(orderId, dto.Status);
            return NoContent();
        }


    }

}
