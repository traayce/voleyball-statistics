using System.Collections.Generic;
using ServiceContracts.Models.Product;

namespace ServiceContracts
{
    public interface IProductService
    {
        IEnumerable<T> GetAll<T>(string name) where T : class, IProductDomainModel, new();
        ProductDomainModel GetById(int id);
        ProductDomainModel Create(ProductDomainModel model);
        
        ProductDomainModel Delete(int id);
        ProductDomainModel Edit(int id, ProductDomainModel model);
        bool IsCodeValid(string code, int id = 0);
    }
}