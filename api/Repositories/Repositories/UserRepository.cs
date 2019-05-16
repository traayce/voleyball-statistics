using System;
using DataAccess;
using DataContracts;
using DataEntities.Entities;
using Repositories.Base;

namespace Repositories
{
    public class UserRepository : GenericRepositoryBase<UserEntity>, IUserRepository
    {
        public UserRepository(DatabaseContext context) : base(context)
        {
        }
    }
}