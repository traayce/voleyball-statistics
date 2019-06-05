using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.MatchServices.MatchPointService.Models;

namespace ServiceContracts.Services.MatchServices.MatchPointService
{
    public interface IMatchPointService
    {
        Task<T> Get<T>(int matchId) where T : IMatchPointDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] matchIds) where T : IMatchPointDomainModel, new();
        Task<T> Save<T>(IMatchPointCreateDomainModel model) where T : IMatchPointsSummaryDomainModel, new();
        void Delete(int matchPointId);
    }
}