using System.Threading.Tasks;

namespace DataContracts.Base
{
    public interface IUnitOfWork
    {
        Task<int> CommitChanges();
        void Rollback();
    }
}