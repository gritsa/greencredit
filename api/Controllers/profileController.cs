using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using GreentableApi.Helpers;
using GreentableApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public  async Task<IActionResult> PutContent(int id,[FromForm] string jsonData, IFormFile file)
        {
            try
            {
                 Profile profile = JsonConvert.DeserializeObject<Profile>(jsonData);
                 var imageResponse = await AmazonS3Service.UploadObject(file); 
                // Users user = (new SecurityHelper(this)).User;
                var newData = _repo.Profile.FirstOrDefault(u => u.id == id);
                if (newData != null)
                {
                    var now = DateTime.UtcNow;
                    newData.firstname = profile.firstname;
                    newData.profilemedia = imageResponse.FileName;
                    newData.createdAt = now;
                    newData.updatedAt = now;

                    _repo.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
                 return Ok(profile);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
           
        }


    }
}