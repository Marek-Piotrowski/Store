using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData{
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            // round up f.ex 1.3 to get 2 pages 
            TotalPages = (int)Math.Ceiling(count / (double)pageSize),
            };

            AddRange(items);
        }

        public MetaData MetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize )
        {
            // execute query against databse
            var count = await query.CountAsync();
            // we skip over f.ex 10 items and take another 10 items
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);    
        }

    }
}
