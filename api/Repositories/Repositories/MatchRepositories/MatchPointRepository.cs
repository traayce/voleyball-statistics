using DataAccess;
using DataContracts.MatchRepositories;
using DataEntities.Entities.Match;
using Repositories.Base;

namespace Repositories.MatchRepositories
{
    public class MatchPointRepository : GenericRepositoryBase<MatchPointEntity>, IMatchPointRepository
    {
        public MatchPointRepository(DatabaseContext context) : base(context)
        {
        }
    }
}