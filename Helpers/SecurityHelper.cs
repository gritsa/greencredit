using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace GreentableApi.Helpers
{
     public class SecurityHelper
    {
        private Users currentUser;
        public Users User
        {
            get { return currentUser; }
        }

        //  public  static string SecurityHelp(ControllerBase controller)
        // {
        //     var context = controller.HttpContext;
        //   this.currentUser = context.Items.ContainsKey("User");
        //     // else{
        //     //      return currentser;
        //     // }
        //     return currentser
        // }

         public static string readToken(String token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedValue = handler.ReadJwtToken(token);
            //  var identity = User.Identity as ClaimsIdentity;  
            IEnumerable<Claim> claims = decodedValue.Claims;
            var id = claims.FirstOrDefault(p => p.Type == "profileid")?.Value;
            return id;
        }
    }
}