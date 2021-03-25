using Microsoft.EntityFrameworkCore;
namespace GreentableApi.Models{
    public class GreentableContext : DbContext{
        public GreentableContext(DbContextOptions<GreentableContext> options) : base(options)
        {}
            public DbSet<Users> Users{get; set;}
        
    }
}