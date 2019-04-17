using AutoMapper;
using DataEntities.Entities;
using ServiceContracts.Models.Product;

namespace Services.Mappings
{
    public class MappingConfig : Profile  
    {  
        public MappingConfig()
        {
            CreateMap<ProductDomainModel, ProductEntity>()
                .ForMember(x => x.Id, c => c.Ignore());
            CreateMap<ProductEntity, ProductDomainModel>();
        }  
    }  
}