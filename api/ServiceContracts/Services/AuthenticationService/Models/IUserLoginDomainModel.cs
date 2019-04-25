namespace ServiceContracts.Services.AuthenticationService.Models
{
    public interface IUserLoginDomainModel
    {
         string Name { get; set; }
         string Token { get; set; }
    }
    public class UserLoginDomainModel : IUserLoginDomainModel
    {
        public string Name { get; set; }
        public string Token { get; set; }
    }
}