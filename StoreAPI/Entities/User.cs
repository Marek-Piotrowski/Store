using Microsoft.AspNetCore.Identity;

namespace StoreAPI.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }

    }
}
