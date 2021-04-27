using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GreentableApi.Models
{
    public class homeContent
    {
        public long id { get; set; }

        public long profileid { get; set; }

        [Required(ErrorMessage = "Profilename is required.")]
        public string profilename { get; set; }
        public string profilemedia { get; set; }
        public string posttext { get; set; }
        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }

        // public string likes { get; set; } //bol
        [Column(TypeName = "jsonb")]
        public string likes { get; set; }

        [Column(TypeName = "jsonb")]
        public string comments { get; set; }
        public string share { get; set; } //number
        public string url { get; set; } //change the url to name with the extension
        [NotMapped]
        public List<Likes> likedata { get; set; }

         public double greenCoin { get; set; } 
        //use float for greemcoin

        //chna


    }
}