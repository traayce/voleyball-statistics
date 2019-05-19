using System;
using DataAccess;
using DataContracts;
using DataContracts.Repositories;
using DataEntities.Entities;
using Repositories.Base;

namespace Repositories
{
    public class PlayerRepository : GenericRepositoryBase<PlayerEntity>, IPlayerRepository
    {
        public PlayerRepository(DatabaseContext context) : base(context)
        {
        }
    }
}