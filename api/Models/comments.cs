using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreentableApi.Models
{

    public class Comments
    {
        public long profileId { get; set; }
        public string commentText { get; set; }
        public DateTime createdAt { get; set; }
    }
}