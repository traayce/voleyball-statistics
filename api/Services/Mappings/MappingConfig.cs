using AutoMapper;
using DataEntities.Entities;
using ServiceContracts.Models.Product;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService.Models;

namespace Services.Mappings
{
    public class MappingConfig : Profile  
    {  
        public MappingConfig()
        {
            CreateMap<ProductDomainModel, ProductEntity>()
                .ForMember(x => x.Id, c => c.Ignore());
            CreateMap<ProductEntity, ProductDomainModel>();
            
            CreateMap<TeamEntity, TeamCreateDomainModel>();
            CreateMap<TeamCreateDomainModel, TeamEntity>()
                .ForMember(x => x.Players, c => c.Ignore());
            
            CreateMap<PlayerEntity, PlayerCreateDomainModel>()
                .ForMember(x => x.TeamId, c => c.MapFrom(x => x.TeamEntityId));
            CreateMap<PlayerCreateDomainModel, PlayerEntity>()
                .ForMember(x => x.TeamEntityId, c => c.MapFrom(x => x.TeamId))
                .ForMember(x => x.TeamEntity, c => c.Ignore());
         }  
     }  
 }