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
using Newtonsoft.Json.Converters;
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
            try
            {
                var data = _repo.homeContent.AsEnumerable().OrderByDescending(x => x.updatedAt).ToList();

                foreach (homeContent c in data)
                {
                    if (c.likes != null)
                    {
                        List<Likes> ForeachLike = new List<Likes>();

                        ForeachLike = JsonConvert.DeserializeObject<List<Likes>>(c.likes);

                        var pr = _repo.Profile.ToList();
                        var likeJoin = pr.Join(
                            ForeachLike,
                            p => p.id,
                            l => l.profileId,
                            (p, l) => new
                            {
                                profileId = p.id,
                                profileName = p.firstname,
                                profileMedia = p.profilemedia
                            }
                        ).ToList();

                        c.likes = JsonConvert.SerializeObject(likeJoin);

                    }
                    if (c.comments != null)
                    {
                        List<Comments> ForeachComment = new List<Comments>();

                        ForeachComment = JsonConvert.DeserializeObject<List<Comments>>(c.comments);
                        var profile = _repo.Profile.ToList();
                        var commentJoin = profile.Join(
                            ForeachComment,
                            p => p.id,
                            l => l.profileId,
                            (p, l) => new
                            {
                                profileId = p.id,
                                commentText = l.commentText,
                                createdAt = l.createdAt,
                                profileName = p.firstname,
                                profileMedia = p.profilemedia
                            }
                        ).ToList();
                        c.comments = JsonConvert.SerializeObject(commentJoin);
                    }
                }
                return Ok(data.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost]
        public async Task<IActionResult> PostnewUser(IFormFile file, [FromForm] string jsonData)
        {
            // var content = new homeContent();
            // List<homeContent> content = 


            try
            {
                homeContent content = JsonConvert.DeserializeObject<homeContent>(jsonData);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var coinData = new greenCoins();
                var imageResponse = await AmazonS3Service.UploadObject(file); //promiseAll
                var data = this.HttpContext.Items["User"].ToString();
                long id = long.Parse(data);
                var newUser = _repo.Profile.FirstOrDefault(u => u.id == id);
                var now = DateTime.UtcNow;
                content.profileid = id;
                content.profilename = newUser.firstname;
                content.profilemedia = newUser.profilemedia;
                content.createdAt = now;
                content.updatedAt = now;
                content.createdBy = newUser.firstname;
                content.updatedBy = newUser.firstname;
                content.url = imageResponse.FileName;

                _repo.Add(content);
                _repo.SaveChanges();

                Random rnd = new Random();
                int coin = rnd.Next(1, 11);  //random value between 1-10
                coinData.profileid = id;
                coinData.postid = content.id;
                coinData.createdAt = now;
                coinData.createdBy = newUser.firstname;
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