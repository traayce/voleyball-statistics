using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchTeamStatisticsDomainModel
    {
        int Id { get; set; }
        string Name { get; set; }
        
        IEnumerable<IMatchPlayerStatisticDomainModel> PlayerStatistics { get; set; }
    }
    
    public class MatchTeamStatisticsDomainModel : IMatchTeamStatisticsDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public IEnumerable<IMatchPlayerStatisticDomainModel> PlayerStatistics { get; set; }
    }
}