using Microsoft.Extensions.Configuration;
using StoreAPI.Entities;
using Stripe;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;

        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

            var deliveryFee = subtotal > 10000 ? 0 : 500;

            // if paymentIntent does not exist - create one
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "sek",
                    PaymentMethodTypes = new List<string>
                    {
                        "card"
                    }

                };

                intent = await service.CreateAsync(options);
                

            } //if payment Intent exist - update it
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee
                };

                await service.UpdateAsync(basket.PaymentIntentId, options); 
            }

            return intent;
        }
    }
}
