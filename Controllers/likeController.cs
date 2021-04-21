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
        public ActionResult<Command> Postnewlike(Likes likes)
        {
            try
            {
                var homecontent = this._repo.homeContent.ToList();
                if (homecontent.Count() > 0)
                {
                    foreach (homeContent c in homecontent)
                    {
                        List<Likes> like;
                        like = new List<Likes>();
                        if (likes.postid == c.id)
                        {
                            like.Add(new Likes()
                            {
                                ownerid = likes.ownerid,
                                postid = likes.postid


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
                                        ownerid = olddata[i].ownerid,
                                        postid = olddata[i].postid
                                    });

                                    if (olddata[i].ownerid == newdata.ownerid)
                                    {
                                        secondlike.RemoveAt(i);
                                    }


                                }
                                if (olddata.Count == secondlike.Count)
                                {
                                    secondlike.Add(new Likes()
                                    {
                                        ownerid = newdata.ownerid,
                                        postid = newdata.postid
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
                return Ok(homecontent);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}