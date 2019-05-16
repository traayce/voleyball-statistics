using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Repositories
{
    public static class RepositoriesDependencyRegistry
    {
        public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.AddDbContext<DatabaseContext>(options =>
                options.UseLazyLoadingProxies().UseSqlServer(appSettingsSection.Get<AppSettings>().ConnectionString));
            return services;
        }
        private class AppSettings
        {
            public string ConnectionString { get; set; }
        }
    }
}