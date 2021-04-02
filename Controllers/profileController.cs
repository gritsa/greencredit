using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using GreentableApi.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class profileContoller : ControllerBase
    {
        private GreentableContext _repo;
        public profileContoller(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllUsers()
        {
            return Ok(_repo.Profile.ToList());
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Command> GetprofileById(int id)
        {
            var userItem = _repo.Profile.FirstOrDefault(u => u.id == id);
            return Ok(userItem);
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult PutContent(int id, Profile profile)
        {
            try
            {
                // Users user = (new SecurityHelper(this)).User;
                var newData = _repo.Profile.FirstOrDefault(u => u.id == id);
                if (newData != null)
                {
                    var now = DateTime.UtcNow;
                    newData.firstname = profile.firstname;
                    newData.lastname = profile.lastname;
                    newData.profilemedia = profile.profilemedia;
                    newData.createdAt = now;
                    newData.updatedAt = now;

                    _repo.SaveChanges();
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok(profile);
        }


    }
}