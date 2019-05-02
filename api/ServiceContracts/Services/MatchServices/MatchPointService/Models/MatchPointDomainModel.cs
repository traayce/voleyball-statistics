namespace ServiceContracts.Services.MatchServices.MatchPointService.Models
{
    public interface IMatchPointDomainModel
    {
        int Id { get; set; }
        
        int SetNumber { get; set; }

        bool IsSetPoint { get; set; }

        bool IsMatchPoint { get; set; }

        int MatchId { get; set; }
        
        int TeamId { get; set; }
    }

    public class MatchPointDomainModel : IMatchPointDomainModel
    {
        public int Id { get; set; }
        
        public int SetNumber { get; set; }

        public bool IsSetPoint { get; set; }

        public bool IsMatchPoint { get; set; }

        public int MatchId { get; set; }
        
        public int TeamId { get; set; }
    }
}