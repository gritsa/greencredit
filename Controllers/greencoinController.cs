using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using GreentableApi.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class greencoinContoller : ControllerBase
    {
        private GreentableContext _repo;
        public greencoinContoller(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllcoins()
        {
            return Ok(_repo.GreenCoins.ToList());
        }

         [HttpGet]
        [Route("{profileid}")]
        public ActionResult<Command> GetcoinsById(int profileid)
        {
            var userItem = _repo.GreenCoins.Where(u => u.profileid == profileid);
            return Ok(userItem.ToList());
        }
    }
}