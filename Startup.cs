using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coreapi.Middlewares;
using GreentableApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;


namespace GreentableApi
{
    public class Startup
    {

        readonly string AllowOrigins = "_allowOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AllowOrigins, builder =>
                {
                    builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });

            services.AddControllers();
            services.AddEntityFrameworkNpgsql().AddDbContext<GreentableContext>(opt => opt.UseNpgsql(Configuration.GetConnectionString("greentableConection")));
            services.AddSwaggerGen(options =>
          {
              options.SwaggerDoc(name: "v1", new Microsoft.OpenApi.Models.OpenApiInfo
              {
                  Title = "Greentable API",
                  Version = "v1",
                  Description = "Greentable API",
              });
          });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();



            // ...

            // This should always be called last to ensure that
            // middleware is registered in the correct order.


            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Greentable API");
            });

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(AllowOrigins);
            // app.UseAuth();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
