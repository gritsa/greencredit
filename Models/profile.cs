using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{
    public class Profile
    {
        public long id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
         public string profilemedia { get; set; }
        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }


        //for making forgein ket relation 
    }
}