using System.Collections.Generic;
using System.Linq;
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

    }
}