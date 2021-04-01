using Microsoft.EntityFrameworkCore;
namespace GreentableApi.Models
{
    public class GreentableContext : DbContext
    {
        public GreentableContext(DbContextOptions<GreentableContext> options) : base(options)
        { }
        public DbSet<Users> Users { get; set; }
        public DbSet<homeContent> homeContent { get; set; }

          public DbSet<Profile> Profile { get; set; }

    }
}