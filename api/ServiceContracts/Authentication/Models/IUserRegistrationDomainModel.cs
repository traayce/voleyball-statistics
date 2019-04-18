namespace ServiceContracts.Authentication.Models
{

    public interface IUserRegistrationDomainModel
    {
        string Email { get; set; }
        string Password { get; set; }
        string Name { get; set; }
    }
    public class UserRegistrationDomainModel : IUserRegistrationDomainModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
}