using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ServiceContracts.Services.AuthenticationService;
using ServiceContracts.Services.MatchServices.MatchPlayerService;
using ServiceContracts.Services.MatchServices.MatchPointService;
using ServiceContracts.Services.MatchServices.MatchService;
using ServiceContracts.Services.MatchServices.PlayerPointService;
using ServiceContracts.Services.PlayerService;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.UserService;
using Services.Services.AuthenticationService;
using Services.Services.MatchServices.MatchPlayerService;
using Services.Services.MatchServices.MatchPointService;
using Services.Services.MatchServices.MatchService;
using Services.Services.MatchServices.PlayerPointService;
using Services.Services.PlayerService;
using Services.Services.TeamService;
using Services.Services.UserService;

namespace Api.Configurations.Common
{
    public static class DependencyContainer
    {
        public static void ConfigureDi(this IServiceCollection services)
        {
            services.TryAddTransient<IAuthenticationService, AuthenticationService>();
            services.TryAddTransient<ITeamService, TeamService>();
            services.TryAddTransient<IPlayerService, PlayerService>();
            services.TryAddTransient<IUserService, UserService>();
            services.TryAddTransient<IMatchService, MatchService>();
            services.TryAddTransient<IMatchPointService, MatchPointService>();
            services.TryAddTransient<IPlayerPointService, PlayerPointService>();
            services.TryAddTransient<IMatchPlayerService, MatchPlayerService>();
            services.TryAddTransient<IMatchStatisticsService, MatchStatisticsService>();
        }
    }
}