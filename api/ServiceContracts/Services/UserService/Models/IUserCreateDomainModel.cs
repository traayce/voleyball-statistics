namespace ServiceContracts.Services.UserService.Models
{

    public interface IUserCreateDomainModel
    {
        string Email { get; set; }
        string Password { get; set; }
        string Name { get; set; }
    }
    public class UserCreateDomainModel : IUserCreateDomainModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
}