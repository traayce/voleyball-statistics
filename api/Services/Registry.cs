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
        public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<IPlayerRepository, PlayerRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(appSettingsSection.Get<AppSettings>().ConnectionString));

            services.AddAutoMapper(x => x.AddProfile(new MappingConfig()));
            return services;
        }
    }
    
    public class AppSettings
    {
        public string Secret { get; set; }
        public string ConnectionString { get; set; }
    }
}