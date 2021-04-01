using System;
using System.Collections.Generic;
using System.Linq;
using GreentableApi.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [Route("api/homecontent")]
    [ApiController]
    public class homeController : ControllerBase
    {
        private GreentableContext _repo;
        public homeController(GreentableContext repo)
        {
            _repo = repo;
        }

          [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllUsers()
        {
            return Ok(_repo.homeContent.ToList());
        }


        [HttpPost]
        public ActionResult<Command> PostnewUser(homeContent content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var now = DateTime.UtcNow;
                content.createdAt = now;
                content.updatedAt = now;
                content.createdBy = content.profilename;
                content.updatedBy = content.profilename;
                _repo.Add(content);
                _repo.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(content);
        }

    }
}