using DataAccess;
using DataContracts.Base;

namespace Repositories.Base
{
    public sealed class TransactionDealerRepository : ITransactionDealerRepository
    {
        private readonly DatabaseContext _dbContext;

        public TransactionDealerRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void BeginTransaction()
        {
            _dbContext.Database.BeginTransaction();
        }

        public void CommitTransaction()
        {
            _dbContext.Database.CommitTransaction();
        }

        public void RollbackTransaction()
        {
            _dbContext.Database.RollbackTransaction();
        }

        public void DisposeTransaction()
        {
            _dbContext.Database.CurrentTransaction.Dispose();
        }
    }
}