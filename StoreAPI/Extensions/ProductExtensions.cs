using StoreAPI.Entities;
using System.Collections.Generic;
using System.Linq;

namespace StoreAPI.Extensions
{
    public static class ProductExtensions
    {
        // this point here to a class Product
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            // if we do not specify orderBy parameter
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                // if we do not specify any parameter,default sorting
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            // if we do not specify search parameter, return just query
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            // we are takin out any white space and make it lowercase
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));

            
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            // make container for list items
            var brandList = new List<string>();
            var typeList = new List<string>();

            // if brands are not empty
            if (!string.IsNullOrWhiteSpace(brands))
            {
                //add typed brand at the end of a list by AddRange method
                brandList.AddRange(brands.ToLower().Split(",").ToList());
            }
               

            // if types are not empty
            if (!string.IsNullOrWhiteSpace(types))
            {
                // retrive type list
                typeList.AddRange(types.ToLower().Split(",").ToList());
            }
               
            


            // we do chain query here, just adding more
            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

           return query;


        }
    }
}
