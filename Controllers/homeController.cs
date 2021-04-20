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
            return Ok(_repo.homeContent.ToList());
        }


        [HttpPost]
        public async Task<IActionResult> PostnewUser(IFormFile file, [FromForm]string jsonData)
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
                // // var data = this.Request.Form.Files[0];
                // using (var stream = new MemoryStream())

                // {
                //     file.CopyTo(stream);

                // }
                var imageResponse = await AmazonS3Service.UploadObject(file);
                JsonResult response = new JsonResult(new Object());
                // Authresponse response = new Authresponse();
                var data = this.HttpContext.Items["User"].ToString();
                long id = long.Parse(data);
                //    var id =  data.FirstOrDefault(p => p.Type == "profileid")?.Value;
                //  var imageResponse = AmazonS3Service.UploadObject(); 
                var now = DateTime.UtcNow;
                content.profileid = id;
                content.createdAt = now;
                content.updatedAt = now;
                content.createdBy = content.profilename;
                content.updatedBy = content.profilename;
                content.url = imageResponse.FileName;
                _repo.Add(content);
                _repo.SaveChanges();
                return Ok(content);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}