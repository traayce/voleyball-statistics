using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.MatchServices.MatchService.Models;

namespace ServiceContracts.Services.MatchServices.MatchService
{
    public interface IMatchService
    {
        Task<T> Get<T>(int matchId) where T : IMatchDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] matchIds) where T : IMatchDomainModel, new();
        Task<T> Save<T>(IMatchCreateDomainModel model) where T : IMatchDomainModel, new();
        IEnumerable<T> GetList<T>() where T : IMatchDomainModel, new();
    }
}