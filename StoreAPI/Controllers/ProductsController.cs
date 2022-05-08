using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using StoreAPI.Data;
using StoreAPI.Entities;
using StoreAPI.Extensions;
using StoreAPI.RequestHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            // we implement our extension metod Sort,Search, Filter to sort first and then return 
            var query =  _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.Searchterm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            // now return data, after all criteria
            // productParams derives from paginationparams
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            // add header to response - optional
            // cut to HtttpExtensions
            // Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));
            // new version
            Response.AddPaginationHeader(products.MetaData);


            return products;

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

        [HttpGet("filters")]

        public async Task<IActionResult> GetFilters()
        {
            // execute query against databse
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            // we turn two Lists, to use in our client App
            return Ok(new {brands, types});
        }
    }
}
