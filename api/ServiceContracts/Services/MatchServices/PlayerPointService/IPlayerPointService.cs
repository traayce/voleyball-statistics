using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;

namespace ServiceContracts.Services.MatchServices.PlayerPointService
{
    public interface IPlayerPointService
    {
        Task<T> Get<T>(int matchId) where T : IPlayerPointDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] matchIds) where T : IPlayerPointDomainModel, new();
        Task<T> Save<T>(IPlayerPointCreateDomainModel model) where T : IPlayerPointDomainModel, new();
    }
}