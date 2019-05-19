using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts.Repositories
{
    public interface IPlayerRepository : IGenericCommands<PlayerEntity>
    {
    }
}