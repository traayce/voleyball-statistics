namespace ServiceContracts.Services.UserService.Models
{
    public interface IUserInfoDomainModel
    {
        int Id { get; set; }
        string Name { get; set; }
        string Email { get; set; }
        string Role { get; set; }
    }

    public class UserInfoDomainModel : IUserInfoDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}