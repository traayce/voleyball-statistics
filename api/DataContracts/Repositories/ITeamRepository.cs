using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts.Repositories
{
    public interface ITeamRepository : IGenericCommands<TeamEntity>
    {
    }
}