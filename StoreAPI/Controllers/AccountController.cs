using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.DTOs;
using StoreAPI.Entities;
using StoreAPI.Extensions;
using StoreAPI.Services;
using System.Threading.Tasks;

namespace StoreAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _storeContext;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext storeContext)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _storeContext = storeContext;
        }

       



        //public IActionResult Index()
        //{
        //    //return View();
        //}

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }

            var userBasket = await RetriveBasket(loginDto.Username);
            //setting anonym basket to that from cookies
            var anonymBasket = await RetriveBasket(Request.Cookies["buyerId"]);

            if( anonymBasket != null)
            {
                //if the user had items, but logged out, replace user items with anonym items
                if(userBasket != null)
                {
                     // just remove user basket
                    _storeContext.Baskets.Remove(userBasket);
                }

                // transfer anonym basket to the user
                anonymBasket.BuyerId = user.UserName;

                Response.Cookies.Delete("buyerId");

                await _storeContext.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonymBasket != null ? anonymBasket.MapBasketToDto() : userBasket?.MapBasketToDto(),
            };
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User()
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);

                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userBasket = await RetriveBasket(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto(),
            };
        }


        private async Task<Basket> RetriveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _storeContext.Baskets
              .Include(i => i.Items)
              .ThenInclude(p => p.Product)
              .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
    }
}
