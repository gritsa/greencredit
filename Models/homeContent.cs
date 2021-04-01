using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{
    public class homeContent
    {
        public long id { get; set; }
        
        [Required(ErrorMessage = "Profilename is required.")]
        public string profilename { get; set; }
        public string profilemedia { get; set; }
        public string description { get; set; }
        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }

        public string posttype { get; set; }
        public string url { get; set; }


    }
}