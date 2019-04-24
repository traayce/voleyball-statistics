using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.TeamService.Models;

namespace ServiceContracts.Services.TeamService
{
    public interface ITeamService
    {
        Task<T> Get<T>(int teamId) where T : ITeamDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] teamIds) where T : ITeamDomainModel, new();
        Task<T> Save<T>(ITeamCreateDomainModel model) where T : ITeamDomainModel, new();
    }
}