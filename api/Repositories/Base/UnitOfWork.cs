using System.Linq;
using System.Threading.Tasks;
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

        public async Task<int> CommitChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
        
        public int CommitChanges()
        {
            return _dbContext.SaveChanges();
        }
        
        public void Rollback()
        {
            _dbContext.ChangeTracker.Entries().ToList().ForEach(x => x.Reload());
        }
    }
}