using DataAccess;
using DataContracts.MatchRepositories;
using DataContracts.Repositories.MatchRepositories;
using DataEntities.Entities.Match;
using Repositories.Base;

namespace Repositories.MatchRepositories
{
    public class MatchRepository : GenericRepositoryBase<MatchEntity>, IMatchRepository
    {
        public MatchRepository(DatabaseContext context) : base(context)
        {
        }
    }
}