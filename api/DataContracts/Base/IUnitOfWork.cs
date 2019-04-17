namespace DataContracts.Base
{
    public interface IUnitOfWork
    {
        int CommitChanges();
    }
}