using DataAccess;
using DataContracts.MatchRepositories;
using DataEntities.Entities.Match;
using Repositories.Base;

namespace Repositories.MatchRepositories
{
    public class PlayerPointRepository : GenericRepositoryBase<PlayerPointEntity>, IPlayerPointRepository
    {
        public PlayerPointRepository(DatabaseContext context) : base(context)
        {
        }
    }
}