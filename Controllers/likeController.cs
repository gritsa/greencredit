using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using GreentableApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
                        // List<Likes> like;
                        // like = new List<Likes>();
                        var like = new Likes();
                        if (likes.postid == c.id)
                        {
                            // if(c.likes != null)
                            // {}
                            // like.Add(new Likes()
                            // {
                            like.ownerid = likes.ownerid;
                            like.postid = likes.postid;


                            // });

                            if (c.likes != null)
                            {
                                // var json = JsonConvert.SerializeObject(like[0]);
                                // var h = like[0];
                                // string[] myArray = new string[] { json };
                                // var tempList = myArray.ToList();
                                // tempList.Add(c.likes);
                                // myArray = tempList.ToArray();
                                // var test = JsonConvert.SerializeObject(myArray);
                                var now = DateTime.UtcNow;
                                c.updatedAt = now;
                                // string st = String.Concat(json, c.likes);
                                // c.likes.Append(mediaInfo);
                                // var hh = JsonConvert.SerializeObject(st);
                                var likedata = JsonConvert.SerializeObject(like);
                                // likedata.ToArray();
                                // c.likes = likedata;
                                var myList = new List<string>();
                                myList.Add(c.likes);
                                myList.Add(likedata);
                                 var fut = JsonConvert.SerializeObject(myList);
                                c.likes = fut;
                                _repo.homeContent.Update(c);
                                _repo.SaveChanges();

                            }
                            else
                            {
                                // var json = JsonConvert.SerializeObject(like[0]);
                                var likedata = JsonConvert.SerializeObject(like);
                                c.likes = likedata;
                                var now = DateTime.UtcNow;
                                c.updatedAt = now;
                                // c.likes.Append(mediaInfo);
                                // c.likes = json;

                                _repo.homeContent.Update(c);
                                _repo.SaveChanges();

                            }


                            //    dynamic mediaInfo = new JArray(json);
                            //    mediaInfo = json;
                            // if (like.Count() > 0)
                            // {
                            //     var now = DateTime.UtcNow;
                            //     c.updatedAt = now;
                            //     // c.likes.Append(mediaInfo);
                            //     c.likes = test;

                            //     _repo.homeContent.Update(c);
                            //     _repo.SaveChanges();
                            // }
                            // else
                            // {
                            //     c.likes = null;
                            // }
                        }


                    }
                }
                return Ok(homecontent);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            // return Ok();
        }
    }
}