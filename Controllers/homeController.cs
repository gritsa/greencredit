using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GreentableApi.Helpers;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class homeController : ControllerBase
    {
        private GreentableContext _repo;
        private static String accessKey = "AKIAJX3JC5HXPQC4Z6TQ";
        private static String accessSecret = "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";
        private static String bucket = "itabmenu";
        public homeController(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("")]                            //to get the request GET api/users
        public ActionResult<IEnumerable<Command>> GetAllUsers()
        {
            var data = _repo.homeContent.AsEnumerable().OrderByDescending(x => x.updatedAt);
            return Ok(data.ToList());
        }


        [HttpPost]
        public async Task<IActionResult> PostnewUser(IFormFile file, [FromForm] string jsonData)
        {
            // var content = new homeContent();
            // List<homeContent> content = 
            homeContent content = JsonConvert.DeserializeObject<homeContent>(jsonData);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var coinData = new greenCoins();
                var imageResponse = await AmazonS3Service.UploadObject(file);
                var data = this.HttpContext.Items["User"].ToString();
                long id = long.Parse(data);
                var now = DateTime.UtcNow;
                content.profileid = id;
                content.createdAt = now;
                content.updatedAt = now;
                content.createdBy = content.profilename;
                content.updatedBy = content.profilename;
                content.url = imageResponse.FileName;

                _repo.Add(content);
                _repo.SaveChanges();

                Random rnd = new Random();
                int coin = rnd.Next(1, 11);  //random value between 1-10
                coinData.profileid = id;
                coinData.postid = content.id;
                coinData.createdAt = now;
                coinData.createdBy = content.profilename;
                coinData.coins = coin; //make it random 1-10 //orderby with linkq //descending
                _repo.Add(coinData);
                _repo.SaveChanges();

                return Ok(coinData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}