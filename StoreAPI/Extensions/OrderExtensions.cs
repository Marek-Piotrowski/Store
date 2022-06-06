﻿using Microsoft.EntityFrameworkCore;
using StoreAPI.DTOs;
using StoreAPI.Entities.OrderAggregate;
using System.Linq;

namespace StoreAPI.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            // maping Order to OrderDto
            return query.Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                OrderStatus = order.OrderStatus.ToString(), // enum to string
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    ProductId = item.ItemOrdered.ProductId,
                    Name = item.ItemOrdered.Name,
                    PictureUrl = item.ItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity,

                }).ToList(),

            }).AsNoTracking();
        }
    }
}
