using StoreAPI.Entities.OrderAggregate;

namespace StoreAPI.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}
