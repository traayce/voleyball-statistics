using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Models.Product;

namespace ServiceContracts
{
    public interface IProductService
    {
        IEnumerable<T> GetAll<T>(string name) where T : class, IProductDomainModel, new();
        Task<ProductDomainModel> GetById(int id);
        ProductDomainModel Create(ProductDomainModel model);
        
        Task<ProductDomainModel> Delete(int id);
        Task<ProductDomainModel> Edit(int id, ProductDomainModel model);
        bool IsCodeValid(string code, int id = 0);
    }
}