namespace ServiceContracts.Services.MatchServices.PlayerPointService.Models
{
    public interface IPlayerPointDomainModel
    {
        int Id { get; set; }

        ClsfPlayerPointType PointType { get; set; }

        int MatchPointId { get; set; }
        int PlayerId { get; set; }
    }

    public class PlayerPointDomainModel : IPlayerPointDomainModel
    {
        public int Id { get; set; }

        public ClsfPlayerPointType PointType { get; set; }

        public int MatchPointId { get; set; }
        public int PlayerId { get; set; }
    }
}