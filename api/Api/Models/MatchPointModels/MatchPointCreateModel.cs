using ServiceContracts.Services.MatchServices.MatchPointService.Models;

namespace Api.Models.MatchPointModels
{
    public class MatchPointCreateModel : IMatchPointCreateDomainModel
    {
        public int Id { get; set; }

        public int PointNumber { get; set; }

        public bool IsSetPoint { get; set; }

        public bool IsMatchPoint { get; set; }

        public int MatchId { get; set; }
    }
}