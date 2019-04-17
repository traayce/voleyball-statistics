using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DataAccess
{
    public class DesignTimeObjectsFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        private const string connectionString =
            "Data Source=localhost\\MSSQLSERVER01;Initial Catalog=TaskDatabase;Integrated Security=True";
        public DatabaseContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new DatabaseContext(optionsBuilder.Options);
        }
    }
}