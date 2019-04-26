namespace DataContracts.Base
{
    public interface ITransactionDealerRepository
    {
        void BeginTransaction();

        void CommitTransaction();

        void RollbackTransaction();

        void DisposeTransaction();
    }
}