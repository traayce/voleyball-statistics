using Api.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ServiceContracts;
using ServiceContracts.Services.AuthenticationService;
using ServiceContracts.Services.PlayerService;
using ServiceContracts.Services.TeamService;
using Services;
using Services.Services.AuthenticationService;
using Services.Services.PlayerService;
using Services.Services.TeamService;

namespace Api.Configurations.Common
{
    public static class DependencyContainer
    {
        public static void ConfigureDi(this IServiceCollection services)
        {
            services.TryAddTransient<IProductService, ProductService>();
            services.TryAddTransient<IProductApplicationService, ProductApplicationService>();
            services.TryAddTransient<IAuthenticationService, AuthenticationService>();
            services.TryAddTransient<ITeamService, TeamService>();
            services.TryAddTransient<IPlayerService, PlayerService>();
        }
    }
}