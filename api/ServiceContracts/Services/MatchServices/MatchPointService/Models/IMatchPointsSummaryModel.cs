using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchPointService.Models
{
    public interface IMatchPointsSummaryDomainModel
    {
        int SetNumber { get; set; }
        int TeamASetPoints { get; set; }
        int TeamBSetPoints { get; set; }
        int TeamAPoints { get; set; }
        int TeamBPoints { get; set; }
        IMatchPointDomainModel LastPoint { get; set; }
        IEnumerable<IMatchPointDomainModel> Points { get; set; }
    }

    public class MatchPointsSummaryDomainModel : IMatchPointsSummaryDomainModel
    {
        public int SetNumber { get; set; }
        public int TeamASetPoints { get; set; }
        public int TeamBSetPoints { get; set; }
        public int TeamAPoints { get; set; }
        public int TeamBPoints { get; set; }
        public IMatchPointDomainModel LastPoint { get; set; }
        public IEnumerable<IMatchPointDomainModel> Points { get; set; }
    }
}