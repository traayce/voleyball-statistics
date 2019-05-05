using DataEntities.Entities;
using DataEntities.Entities.Match;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options) : base(options){ }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<TeamEntity> Teams { get; set; }
        public DbSet<PlayerEntity> Players { get; set; }
        public DbSet<MatchEntity> Matches { get; set; }
        public DbSet<MatchPointEntity> MatchPoints { get; set; }
        
        public DbSet<PlayerPointEntity> PlayerPoints { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            builder.Entity<UserEntity>()
                .HasIndex(x => x.Email)
                .IsUnique();
            
            builder.Entity<UserEntity>()
                .Property(x => x.Role)
                .HasDefaultValue("User");
        }
    }
}