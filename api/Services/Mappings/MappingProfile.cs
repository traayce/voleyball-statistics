using AutoMapper;
using DataEntities.Base;
using DataEntities.Entities;
using ServiceContracts.Models.Product;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService.Models;

namespace Services.Mappings
{
    public class MappingProfile : Profile  
    {  
        public MappingProfile()
        {
            CreateMap<ProductDomainModel, ProductEntity>()
                .ForMember(x => x.Id, c => c.Ignore())
                .IgnoreAudit();
            CreateMap<ProductEntity, ProductDomainModel>();
            
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
         }  
     }

    public static class MapperExtensions
    {
        public static IMappingExpression<TSource, TDestination> IgnoreAudit<TSource, TDestination>(this IMappingExpression<TSource, TDestination> mappingExpression)
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