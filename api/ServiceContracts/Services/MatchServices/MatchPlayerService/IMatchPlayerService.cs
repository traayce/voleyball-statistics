using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;

namespace ServiceContracts.Services.MatchServices.MatchPlayerService
{
    public interface IMatchPlayerService
    {
        Task<T> Get<T>(int matchId) where T : IMatchPlayerDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] matchIds) where T : IMatchPlayerDomainModel, new();
        Task<T> Save<T>(IMatchPlayerCreateDomainModel model) where T : IMatchPlayerDomainModel, new();
        Task<T> GetCreateModel<T>(int id) where T : IMatchPlayerCreateDomainModel, new();
    }
}