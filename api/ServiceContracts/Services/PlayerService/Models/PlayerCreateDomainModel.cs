namespace ServiceContracts.Services.PlayerService.Models
{
    public interface IPlayerCreateDomainModel : IPlayerDomainModel
    {
    }
    
    public class PlayerCreateDomainModel : PlayerDomainModel, IPlayerCreateDomainModel
    {
    }
}