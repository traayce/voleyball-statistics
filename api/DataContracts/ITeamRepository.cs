using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts
{
    public interface ITeamRepository : IGenericCommands<TeamEntity>
    {
    }
}