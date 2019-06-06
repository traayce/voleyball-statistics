using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceContracts.Services.PlayerService.Models;

namespace ServiceContracts.Services.PlayerService
{
    public interface IPlayerService
    {
        Task<T> Get<T>(int playerId) where T : IPlayerDomainModel, new();
        IEnumerable<T> GetByIds<T>(int[] playerIds) where T : IPlayerDomainModel, new();
        Task<T> Save<T>(IPlayerCreateDomainModel model) where T : IPlayerDomainModel, new();

        bool Delete(int playerId);
        Task<T> GetCreateModel<T>(int id) where T : IPlayerCreateDomainModel, new();
    }
}