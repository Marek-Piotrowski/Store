using Microsoft.AspNetCore.Http;
using StoreAPI.RequestHelpers;
using System.Text.Json;

namespace StoreAPI.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData) 
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData,options));
            // add this to cors header to be available to read this in the client !!!! Important !!!!
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
