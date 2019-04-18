using System.Threading.Tasks;
using AutoMapper;
using DataAccess;
using DataContracts;
using DataContracts.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repositories;
using Repositories.Base;
using ServiceContracts.Authentication.Models;
using Services.Mappings;

namespace Services
{
    public static class Registry
    {
        private const string connectionString =
            "Data Source=localhost\\MSSQLSERVER01;Initial Catalog=TaskDatabase;Integrated Security=True";
        public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(connectionString));
            
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            services.AddAutoMapper(x => x.AddProfile(new MappingConfig()));
            return services;
        }
    }
}