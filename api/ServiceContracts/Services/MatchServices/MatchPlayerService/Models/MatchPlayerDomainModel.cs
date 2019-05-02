using ServiceContracts.Services.PlayerService.Models;

namespace ServiceContracts.Services.MatchServices.MatchPlayerService.Models
{
    public interface IMatchPlayerDomainModel
    {
         int Id { get; set; }

         bool IsOnCourt { get; set; }

         IPlayerDomainModel Player { get; set; }

         int MatchId { get; set; }
         
         int TeamId { get; set; }
    }

    public class MatchPlayerDomainModel : IMatchPlayerDomainModel
    {
        public int Id { get; set; }

        public bool IsOnCourt { get; set; }

        public IPlayerDomainModel Player { get; set; }

        public int MatchId { get; set; }
        
        public int TeamId { get; set; }
    }
}