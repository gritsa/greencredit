using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using GreentableApi.Helpers;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

/// <summary>
/// Middlewares Namespace
/// </summary>
namespace coreapi.Middlewares
{

    /// <summary>
    /// Authentication Middleware to handle incoming requests
    /// </summary>
    public class AuthMiddleware
    {
        /// <summary>
        /// Holds reference to next
        /// </summary>
        private readonly RequestDelegate _next;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="next">Injected next request delegate</param>
        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Invoke override
        /// </summary>
        /// <param name="context">Injected http context</param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments(new PathString("/api/user")))
            {
                await _next(context);
            }
            else if (context.Request.Headers.ContainsKey("Authorization") && context.Request.Headers["Authorization"].ToString().StartsWith("Bearer"))
            {
                var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer", "");
                var handler = new JwtSecurityTokenHandler();
                var id = SecurityHelper.ValidateToken(token);
                if (id == null)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token Invalid");
                }
                else
                {
                    context.Items["User"] = id;
                    var data = context.Items["User"];
                    await _next(context);
                }

            }
            else

            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
            }
        }
    }

    /// <summary>
    /// Auth Extensions
    /// </summary>
    public static class AuthExtensions
    {
        /// <summary>
        /// Sets up Auth Middleware to be used by the Web API app
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthMiddleware>();
        }
    }


}