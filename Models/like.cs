using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{
   
    public class Likes
    {
        public long ownerid { get; set; }
         public long postid { get; set; }
    }
}