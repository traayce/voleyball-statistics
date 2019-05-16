using DataContracts.Base;
using DataEntities.Entities;

namespace DataContracts
{
    public interface IUserRepository : IGenericCommands<UserEntity>
    {
    }
}