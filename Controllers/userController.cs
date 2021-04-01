using System;
using System.Collections.Generic;
using System.Linq;
using GreentableApi.Helpers;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
namespace GreentableApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class userContoller : ControllerBase
    {
        private GreentableContext _repo;
        public userContoller(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllUsers()
        {
            return Ok(_repo.Users.ToList());
        }

        [Route("")]
        [HttpPost]
        public ActionResult PostnewUser(Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newUser = _repo.Users.FirstOrDefault(u => u.googleuid == user.googleuid && u.email == user.email);
                if (newUser == null)
                {
                    var profile = new Profile();
                    var now = DateTime.UtcNow;
                    //new row entry in profile 
                    profile.createdAt = now;
                    profile.updatedAt = now;
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
                    newUser.name = user.name;
                    newUser.meta = user.meta;
                    _repo.Users.Update(newUser);
                    _repo.SaveChanges();
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