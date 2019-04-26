using System.Threading.Tasks;

namespace DataContracts.Base
{
    public interface IUnitOfWork
    {
        Task<int> CommitChangesAsync();
        int CommitChanges();
        void Rollback();
    }
}