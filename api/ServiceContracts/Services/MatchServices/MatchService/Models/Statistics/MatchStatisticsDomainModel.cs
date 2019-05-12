using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchStatisticsDomainModel
    {
        int Id { get; set; }
        IMatchTeamStatisticsDomainModel MatchTeamA { get; set; }
        IMatchTeamStatisticsDomainModel MatchTeamB { get; set; }
        IEnumerable<IMatchSetDomainModel> Sets { get; set; }
    }

    public class MatchStatisticsDomainModel : IMatchStatisticsDomainModel
    {
        public int Id { get; set; }
        public IMatchTeamStatisticsDomainModel MatchTeamA { get; set; }
        public IMatchTeamStatisticsDomainModel MatchTeamB { get; set; }
        public IEnumerable<IMatchSetDomainModel> Sets { get; set; }
    }
}