using System;
using DataAccess;
using DataContracts;
using DataContracts.Repositories;
using DataEntities.Entities;
using Repositories.Base;

namespace Repositories
{
    public class TeamRepository : GenericRepositoryBase<TeamEntity>, ITeamRepository
    {
        public TeamRepository(DatabaseContext context) : base(context)
        {
        }
    }
}