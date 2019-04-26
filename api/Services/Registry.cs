using System;
using System.Threading.Tasks;
using AutoMapper;
using DataAccess;
using DataContracts;
using DataContracts.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Repositories;
using Repositories.Base;
using Services.Mappings;
using Services.Services.Base;

namespace Services
{
    public static class Registry
    {
        public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.TryAddTransient<ITransactionDealerRepository, TransactionDealerRepository>();
            services.TryAddTransient<ITransactedCaller, TransactedCaller>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<IPlayerRepository, PlayerRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<DatabaseContext>(options =>
                options.UseLazyLoadingProxies().UseSqlServer(appSettingsSection.Get<AppSettings>().ConnectionString));
            return services;
        }
    }
    
    public class AppSettings
    {
        public string Secret { get; set; }
        public string ConnectionString { get; set; }
    }
}