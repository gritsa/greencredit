using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{
    public class Users
    {
        public long id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        public string googleuid { get; set; }
    }
}