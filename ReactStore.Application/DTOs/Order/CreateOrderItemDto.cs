namespace ReactStore.Application.DTOs.Order
{
    public record CreateOrderItemDto(
    int ProductId,
    int Quantity,
    decimal Price
);

    public record OrderDetailsDto(
      int OrderId,
      decimal TotalAmount,
      string Status,
      DateTime CreatedAt,
      List<CreateOrderItemDto> Items
  );
    public record UpdateOrderStatusDto(string Status);

}
