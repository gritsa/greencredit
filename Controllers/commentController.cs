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
    public class commentController : ControllerBase
    {
        private GreentableContext _repo;
        public commentController(GreentableContext repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public ActionResult<Command> Postnewlike(Comments comments)
        {
            try
            {
                var data = this.HttpContext.Items["User"].ToString();
                long id = long.Parse(data);
                var newUser = _repo.Profile.FirstOrDefault(u => u.id == id);
                var homecontent = this._repo.homeContent.ToList();
                if (homecontent.Count() > 0)
                {
                    foreach (homeContent c in homecontent)
                    {
                        List<Comments> comment;
                        comment = new List<Comments>();
                        if (comments.postid == c.id)
                        {
                            comment.Add(new Comments()
                            {
                                ownerid = newUser.id,
                                postid = comments.postid,
                                commentText = comments.commentText,
                                ownername = newUser.firstname,
                                ownermedia = newUser.profilemedia


                            });

                            if (c.comments != null)
                            {
                                List<Comments> secondcomment;
                                secondcomment = new List<Comments>();
                                var newpush = JsonConvert.SerializeObject(comment[0]);
                                dynamic newdata = JsonConvert.DeserializeObject<dynamic>(newpush);
                                dynamic olddata = JsonConvert.DeserializeObject<dynamic>(c.comments);
                                for (var i = 0; i < olddata.Count; i++)
                                {

                                    secondcomment.Add(new Comments()
                                    {
                                        ownerid = olddata[i].ownerid,
                                        postid = olddata[i].postid,
                                        commentText = olddata[i].commentText,
                                        ownername = olddata[i].ownername,
                                        ownermedia = olddata[i].ownermedia
                                    });

                                }

                                secondcomment.Add(new Comments()
                                {
                                    ownerid = newdata.ownerid,
                                    postid = newdata.postid,
                                    commentText = newdata.commentText,
                                    ownername = newdata.ownername,
                                    ownermedia = newdata.ownermedia
                                });



                                var finalLikeData = JsonConvert.SerializeObject(secondcomment);
                                c.comments = finalLikeData;
                                var now = DateTime.UtcNow;
                                c.updatedAt = now;
                                _repo.homeContent.Update(c);
                                _repo.SaveChanges();
                            }
                            else
                            {
                                var likeData = JsonConvert.SerializeObject(comment);
                                c.comments = likeData;
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