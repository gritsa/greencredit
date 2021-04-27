using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace GreentableApi.Helpers
{
    public class SecurityHelper
    {
        private Users currentUser;
        public Users User
        {
            get { return currentUser; }
        }

        private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

        // public static string getProfiledata(String data)
        // {
        //     dynamic newdata = JsonConvert.DeserializeObject<dynamic>(data);
        //     IEnumerable<dynamic> profileData = newdata;
        //     var id = profileData.FirstOrDefault(p => p.Type == "profileid")?.Value;
        //     var email = profileData.FirstOrDefault(p => p.Type == "email")?.Value;
        //     List<profileResponse> listitem;
        //     listitem = new List<profileResponse>();
        //     listitem.Add(new profileResponse()
        //     {
        //         profileid = id,
        //         profilemail = email


        //     });
        //     var newpush = JsonConvert.SerializeObject(listitem[0]);

        //     return newpush;
        // }

        public static string ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==");
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                IEnumerable<Claim> claims = jwtToken.Claims;
                var id = claims.FirstOrDefault(p => p.Type == "profileid")?.Value;

                // return account id from JWT token if validation successful
                return id;
            }
            catch
            {
                // return null if validation fails
                return null;
            }

        }
    }
}