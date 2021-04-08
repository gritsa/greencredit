using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

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
            // if (context.Request.Path.StartsWithSegments(new PathString("/api/Auth")) ||
            // context.Request.Path.StartsWithSegments(new PathString("/swagger")) ||
            // context.Request.Path.StartsWithSegments(new PathString("/api/devexpressdashboard")))
            // {
            //     // If an authorization header was sent to the Auth API, validate it into a User object. This is needed for switching client tokens.
            //     if (context.Request.Headers.ContainsKey("Authorization") && context.Request.Headers["Authorization"].ToString().StartsWith("Bearer "))
            //     {
            //         var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //         context.Items["User"] = SecurityHelper.ValidateToken(token);
            //     }

            //     await this._next.Invoke(context);
            // }
            // else if (context.Request.Headers.ContainsKey("Authorization") && context.Request.Headers["Authorization"].ToString().StartsWith("Bearer ") &&
            // context.Request.Headers.ContainsKey("EntityId") && context.Request.Headers.ContainsKey("TimePeriodId"))
            // {
            //     var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //     context.Items["User"] = SecurityHelper.ValidateToken(token);
            //     context.Items["Entity"] = context.Request.Headers["EntityId"];
            //     context.Items["TimePeriodId"] = context.Request.Headers["TimePeriodId"];

            //     if (context.Items["User"] == null)
            //     {
            //         context.Response.StatusCode = 401;
            //         await context.Response.WriteAsync("Unauthorized");
            //     }
                // else
                // {
                //     await this._next.Invoke(context);
                // }
            // }
            // else
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