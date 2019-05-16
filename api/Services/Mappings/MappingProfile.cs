using System.Linq;
using AutoMapper;
using DataEntities.Base;
using DataEntities.Entities;
using DataEntities.Entities.Match;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;
using ServiceContracts.Services.MatchServices.MatchPointService.Models;
using ServiceContracts.Services.MatchServices.MatchService.Models;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService.Models;
using Services.Services.MatchServices.MatchPlayerService;
using Services.Services.MatchServices.MatchPointService;
using Services.Services.TeamService;
using Services.Services.UserService;

namespace Services.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TeamEntity, TeamCreateDomainModel>();

            CreateMap<ITeamCreateDomainModel, TeamEntity>()
                .ForMember(x => x.Players, c => c.Ignore())
                .IgnoreAudit();

            CreateMap<PlayerEntity, PlayerCreateDomainModel>()
                .ForMember(x => x.TeamId, c => c.MapFrom(x => x.TeamEntityId));
            CreateMap<IPlayerCreateDomainModel, PlayerEntity>()
                .ForMember(x => x.TeamEntityId, c => c.MapFrom(x => x.TeamId))
                .ForMember(x => x.TeamEntity, c => c.Ignore())
                .IgnoreAudit();

            CreateMap<PlayerEntity, IPlayerDomainModel>()
                .ForMember(x => x.TeamId, c => c.MapFrom(x => x.TeamEntityId));

            CreateMap<MatchEntity, IMatchCreateDomainModel>();
            CreateMap<IMatchCreateDomainModel, MatchEntity>()
                .ForMember(x => x.TeamAEntity, c => c.Ignore())
                .ForMember(x => x.TeamBEntity, c => c.Ignore())
                .IgnoreAudit();

            CreateMap<MatchEntity, IMatchDomainModel>()
                .ForMember(x => x.TeamA, c => c.MapFrom(x => TeamService.FormModel(x.TeamAEntity)))
                .ForMember(x => x.TeamB, c => c.MapFrom(x => TeamService.FormModel(x.TeamBEntity)))
                .ForMember(x => x.Secretary, c => c.MapFrom(x => UserService.FormModel(x.SecretaryEntity)))
                .ForMember(x => x.MatchPlayers, c => c.MapFrom(x => MatchPlayerService.FormModel(x.MatchPlayers)))
                .ForMember(x => x.PointsSummary, c => c.MapFrom(x => MatchPointService.FormModel(x.MatchPoints, x.TeamAId, x.TeamBId)));

            CreateMap<MatchPointEntity, IMatchPointCreateDomainModel>();
            CreateMap<IMatchPointCreateDomainModel, MatchPointEntity>()
                .ForMember(x => x.MatchEntity, c => c.Ignore())
                .IgnoreAudit();

            CreateMap<MatchPointEntity, IMatchPointDomainModel>();

            CreateMap<MatchPlayerEntity, IMatchPlayerCreateDomainModel>();
            CreateMap<IMatchPlayerCreateDomainModel, MatchPlayerEntity>()
                .ForMember(x => x.PlayerEntity, c => c.Ignore())
                .IgnoreAudit();

            CreateMap<MatchPlayerEntity, IMatchPlayerDomainModel>()
                .ForMember(x => x.Player, c => c.MapFrom(x => x.PlayerEntity));
            
            CreateMap<PlayerPointEntity, IPlayerPointCreateDomainModel>();
            CreateMap<IPlayerPointCreateDomainModel, PlayerPointEntity>()
                .IgnoreAudit();
            
            CreateMap<PlayerPointEntity, IPlayerPointDomainModel>();
        }
    }

    public static class MapperExtensions
    {
        public static IMappingExpression<TSource, TDestination> IgnoreAudit<TSource, TDestination>(
            this IMappingExpression<TSource, TDestination> mappingExpression)
            where TDestination : IAuditable
        {
            return mappingExpression
                .ForMember(c => c.UpdatedAt, x => x.Ignore())
                .ForMember(c => c.CreatedAt, x => x.Ignore())
                .ForMember(c => c.CreatedBy, x => x.Ignore())
                .ForMember(c => c.UpdatedBy, x => x.Ignore());
        }
    }
}