using DataContracts.Base;
using DataEntities.Entities.Match;

namespace DataContracts.Repositories.MatchRepositories
{
    public interface IMatchRepository : IGenericCommands<MatchEntity>
    {
    }
}