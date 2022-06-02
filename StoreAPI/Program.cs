using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StoreAPI.Data;
using StoreAPI.Entities;

namespace StoreAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // remove Run method
            var host = CreateHostBuilder(args).Build();
            // create scope
            using var scope = host.Services.CreateScope();
            // provide with context
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            // implement roles
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            try
            {
                // here we create our database
                await context.Database.MigrateAsync();
                // add products to database
                await DbInitializer.Initialize(context, userManager);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            /* that is equal to using before scope : finally
            {
                context.Dispose(); 
            }*/

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
