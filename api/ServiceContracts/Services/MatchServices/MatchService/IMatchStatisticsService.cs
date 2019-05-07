using System.Threading.Tasks;
using ServiceContracts.Services.MatchServices.MatchService.Models.Statistics;

namespace ServiceContracts.Services.MatchServices.MatchService
{
    public interface IMatchStatisticsService
    {
        Task<T> GetStatistics<T>(int id) where T : IMatchStatisticsDomainModel, new();
    }
}