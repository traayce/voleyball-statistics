using DataEntities.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options) : base(options){ }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductEntity>()
                .HasIndex(x => x.Code)
                .IsUnique();
            
            builder.Entity<UserEntity>()
                .HasIndex(x => x.Email)
                .IsUnique();
            
            builder.Entity<UserEntity>()
                .Property(x => x.Role)
                .HasDefaultValue("User");
        }
    }
}