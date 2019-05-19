using DataContracts;
using DataContracts.Base;
using DataContracts.MatchRepositories;
using DataContracts.Repositories;
using DataContracts.Repositories.MatchRepositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Repositories;
using Repositories.Base;
using Repositories.MatchRepositories;
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
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<IPlayerRepository, PlayerRepository>();
            services.AddTransient<IMatchRepository, MatchRepository>();
            services.AddTransient<IMatchPointRepository, MatchPointRepository>();
            services.AddTransient<IPlayerPointRepository, PlayerPointRepository>();
            services.AddTransient<IMatchPlayerRepository, MatchPlayerRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            RepositoriesDependencyRegistry.AddServices(services, configuration);
            return services;
        }
    }
    
    public class AppSettings
    {
        public string Secret { get; set; }
        public string ConnectionString { get; set; }
    }
}