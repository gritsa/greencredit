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
        [Route("{id}")]
        public ActionResult<Command> Postnewlike(int id, Comments comments)
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
                        List<Comments> comment;
                        comment = new List<Comments>();
                        if (id == c.id)
                        {
                            var currentdate = DateTime.UtcNow;
                            comment.Add(new Comments()
                            {
                                profileId = newUser.id,
                                commentText = comments.commentText,
                                createdAt = currentdate
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
                                        profileId = olddata[i].profileId,
                                        commentText = olddata[i].commentText,
                                        createdAt = olddata[i].createdAt,
                                    });

                                }

                                secondcomment.Add(new Comments()
                                {
                                    profileId = newdata.profileId,
                                    commentText = newdata.commentText,
                                    createdAt = newdata.createdAt
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
                 var homedata = _repo.homeContent.AsEnumerable().OrderByDescending(x => x.updatedAt);
                return Ok(homedata.ToList());

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}