using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.Entities;
using StoreAPI.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy,
            string searchTerm, string brands, string types)
        {
            // we implement our extension metod Sort,Search, Filter to sort first and then return 
            var query =  _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .Filter(brands, types)
                .AsQueryable();

            // now return data, after all criteria
            return await query.ToListAsync();

        }

        // api/products/3
        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}
