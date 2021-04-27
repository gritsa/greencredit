using System;
using System.Collections.Generic;
using System.Linq;
using GreentableApi.Helpers;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
namespace GreentableApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class userController : ControllerBase
    {
        private GreentableContext _repo;
        public userController(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllUsers()
        {
            return Ok(_repo.Users.ToList());
        }

        [HttpPost]
        public ActionResult PostnewUser(Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                dynamic metavlue = JObject.Parse(user.meta);
                if (metavlue != null)
                {
                    string displayname = metavlue.displayName;
                    // string lastname = metavlue.lastname;
                    string profilemedia = metavlue.photoURL;
                    var newUser = _repo.Users.FirstOrDefault(u => u.googleuid == user.googleuid && u.email == user.email);
                    if (newUser == null)
                    {
                        //new row entry in profile 

                        var profile = new Profile();
                        var now = DateTime.UtcNow;
                        profile.createdAt = now;
                        profile.updatedAt = now;
                        profile.firstname = displayname;
                        profile.profilemedia = profilemedia;
                        _repo.Add(profile);
                        _repo.SaveChanges();

                        user.createdAt = now;
                        user.updatedAt = now;
                        user.createdBy = user.email;
                        user.updatedBy = user.email;
                        user.googleuid = user.googleuid;
                        user.profileid = profile.id;
                        _repo.Add(user);
                        _repo.SaveChanges();
                        Authresponse response = new Authresponse();
                        response.User = user;
                        response.Token = AuthwithJwt.GenerateJsonWebToken(user);
                        response.Success = "Success!!";
                        return Ok(response);
                    }
                    else
                    {
                        var now = DateTime.UtcNow;
                        newUser.updatedAt = now;
                        newUser.meta = user.meta;
                        _repo.Users.Update(newUser);
                        _repo.SaveChanges();
                         Authresponse response = new Authresponse();
                        response.User = newUser;
                        response.Token = AuthwithJwt.GenerateJsonWebToken(newUser);
                        response.Success = "Success!!";
                         return Ok(response); 
                    }
                }


            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(user);
        }

    }
}