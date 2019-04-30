namespace ServiceContracts.Services.MatchServices.MatchPlayerService.Models
{
    public interface IMatchPlayerCreateDomainModel
    {
        int Id { get; set; }

        bool IsOnCourt { get; set; }

        int PlayerId { get; set; }

        int MatchId { get; set; }
    }

    public class MatchPlayerCreateDomainModel : IMatchPlayerCreateDomainModel
    {
        public int Id { get; set; }

        public bool IsOnCourt { get; set; }
        public int PlayerId { get; set; }

        public int MatchId { get; set; }
        
        public int TeamId { get; set; }
    }
}