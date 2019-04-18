namespace ServiceContracts.Authentication.Models
{
    public interface IUserDomainModel
    {
         string Name { get; set; }
         string Token { get; set; }
    }
    public class UserDomainModel : IUserDomainModel
    {
        public string Name { get; set; }
        public string Token { get; set; }
    }
}