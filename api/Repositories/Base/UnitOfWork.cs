using DataAccess;
using DataContracts.Base;

namespace Repositories.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _dbContext;


        public UnitOfWork(DatabaseContext context)
        {
            _dbContext = context;
        }

        public int CommitChanges()
        {
            return _dbContext.SaveChanges();
        }
    }
}