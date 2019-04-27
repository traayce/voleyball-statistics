namespace ServiceContracts.Services.MatchServices.MatchPointService.Models
{
    public interface IMatchPointCreateDomainModel : IMatchPointDomainModel
    {
    }

    public class MatchPointCreateDomainModel : MatchPointDomainModel, IMatchPointCreateDomainModel
    {
    }
}