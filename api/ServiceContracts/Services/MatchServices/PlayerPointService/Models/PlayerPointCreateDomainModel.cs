namespace ServiceContracts.Services.MatchServices.PlayerPointService.Models
{
    public interface IPlayerPointCreateDomainModel : IPlayerPointDomainModel
    {
    }

    public class PlayerPointCreateDomainModel : PlayerPointDomainModel, IPlayerPointCreateDomainModel
    {
    }
}