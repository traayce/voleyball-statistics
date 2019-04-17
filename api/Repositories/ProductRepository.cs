using System;
using DataAccess;
using DataContracts;
using DataEntities.Entities;
using Repositories.Base;

namespace Repositories
{
    public class ProductRepository : GenericRepositoryBase<ProductEntity>, IProductRepository
    {
        public ProductRepository(DatabaseContext context) : base(context)
        {
        }
    }
}