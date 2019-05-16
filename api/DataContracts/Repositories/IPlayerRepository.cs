using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts
{
    public interface IPlayerRepository : IGenericCommands<PlayerEntity>
    {
    }
}