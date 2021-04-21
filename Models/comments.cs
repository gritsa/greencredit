using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{

    public class Comments
    {
        public long ownerid { get; set; }
        public long postid { get; set; }
        public string commentText { get; set; }
        public string ownername { get; set; }
        public string ownermedia { get; set; }
    }
}