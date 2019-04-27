namespace ServiceContracts.Services.MatchServices.MatchPointService.Models
{
    public interface IMatchPointDomainModel
    {
        int Id { get; set; }

        int PointNumber { get; set; }

        bool IsSetPoint { get; set; }

        bool IsMatchPoint { get; set; }

        int MatchId { get; set; }
    }

    public class MatchPointDomainModel : IMatchPointDomainModel
    {
        public int Id { get; set; }

        public int PointNumber { get; set; }

        public bool IsSetPoint { get; set; }

        public bool IsMatchPoint { get; set; }

        public int MatchId { get; set; }
    }
}