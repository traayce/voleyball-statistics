using DataContracts.Base;
using DataEntities.Entities.Match;

namespace DataContracts.MatchRepositories
{
    public interface IMatchRepository : IGenericCommands<MatchEntity>
    {
    }
}