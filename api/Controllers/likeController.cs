using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using GreentableApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreentableApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class likeController : ControllerBase
    {
        private GreentableContext _repo;
        public likeController(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("{id}")]
        public ActionResult<Command> Postnewlike(int id)
        {
            try
            {
                var data = this.HttpContext.Items["User"].ToString();
                long userid = long.Parse(data);
                var newUser = _repo.Profile.FirstOrDefault(u => u.id == userid);
                var homecontent = this._repo.homeContent.ToList();
                if (homecontent.Count() > 0)
                {
                    foreach (homeContent c in homecontent)
                    {
                        List<Likes> like;
                        like = new List<Likes>();
                        if (id == c.id)
                        {
                            like.Add(new Likes()
                            {
                                profileId = newUser.id,
                                // postid = likes.postid,
                                // displayName = newUser.firstname,
                                // profilemedia = newUser.profilemedia


                            });

                            if (c.likes != null)
                            {
                                List<Likes> secondlike;
                                secondlike = new List<Likes>();
                                var newpush = JsonConvert.SerializeObject(like[0]);
                                dynamic newdata = JsonConvert.DeserializeObject<dynamic>(newpush);
                                dynamic olddata = JsonConvert.DeserializeObject<dynamic>(c.likes);
                                for (var i = 0; i < olddata.Count; i++)
                                {

                                    secondlike.Add(new Likes()
                                    {
                                        profileId = olddata[i].profileId,
                                        // postid = olddata[i].postid,
                                        // displayName = olddata[i].displayName,
                                        // profilemedia = olddata[i].profilemedia

                                    });

                                    if (olddata[i].profileId == newdata.profileId)
                                    {
                                        secondlike.RemoveAt(i);
                                    }


                                }
                                if (olddata.Count == secondlike.Count)
                                {
                                    secondlike.Add(new Likes()
                                    {
                                        profileId = newdata.profileId,
                                        // postid = newdata.postid,
                                        // displayName = newdata.displayName,
                                        // profilemedia = newdata.profilemedia
                                    });
                                }


                                var finalLikeData = JsonConvert.SerializeObject(secondlike);
                                c.likes = finalLikeData;
                                var now = DateTime.UtcNow;
                                c.updatedAt = now;
                                _repo.homeContent.Update(c);
                                _repo.SaveChanges();
                            }
                            else
                            {
                                var likeData = JsonConvert.SerializeObject(like);
                                c.likes = likeData;
                                var now = DateTime.UtcNow;
                                c.updatedAt = now;
                                _repo.homeContent.Update(c);
                                _repo.SaveChanges();

                            }
                        }


                    }
                }
                var homedata = _repo.homeContent.AsEnumerable().OrderByDescending(x => x.updatedAt);
                return Ok(homedata.ToList());
                // return Ok(homecontent);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}