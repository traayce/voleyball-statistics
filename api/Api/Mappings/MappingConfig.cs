using System;
using System.Collections;
using System.IO;
using Api.Models.Product;
using AutoMapper;
using ServiceContracts.Models.Product;

namespace Api.Mappings
{
    public class MappingConfig : Profile  
    {  
        public MappingConfig()  
        {  
            CreateMap<ProductViewModel, ProductDomainModel>();
            CreateMap<ProductDomainModel, ProductViewModel>();
        }  
    }  
}