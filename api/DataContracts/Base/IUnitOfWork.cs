using System.Threading.Tasks;

namespace DataContracts.Base
{
    public interface IUnitOfWork
    {
        Task<int> CommitChangesAsync();
        void Rollback();
    }
}