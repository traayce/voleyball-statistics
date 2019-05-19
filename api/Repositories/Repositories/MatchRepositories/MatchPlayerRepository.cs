using DataAccess;
using DataContracts.MatchRepositories;
using DataContracts.Repositories.MatchRepositories;
using DataEntities.Entities.Match;
using Repositories.Base;

namespace Repositories.MatchRepositories
{
    public class MatchPlayerRepository : GenericRepositoryBase<MatchPlayerEntity>, IMatchPlayerRepository
    {
        public MatchPlayerRepository(DatabaseContext context) : base(context)
        {
        }
    }
}