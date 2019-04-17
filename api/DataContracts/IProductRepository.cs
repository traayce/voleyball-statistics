using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts
{
    public interface IProductRepository : IGenericCommands<ProductEntity>
    {
    }
}