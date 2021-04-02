using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

        public string likes { get; set; }

         public string comments { get; set; }
          public string share { get; set; }
        public string url { get; set; }


    }
}