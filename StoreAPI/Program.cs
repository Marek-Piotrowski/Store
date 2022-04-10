using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StoreAPI.Data;

namespace StoreAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // remove Run method
            var host = CreateHostBuilder(args).Build();
            // create scope
            using var scope = host.Services.CreateScope();
            // provide with context
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();

            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            try
            {
                // here we create our database
                context.Database.Migrate();
                // add products to database
                DbInitializer.Initialize(context);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            /* that is equal to using before scope : finally
            {
                context.Dispose(); 
            }*/

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
