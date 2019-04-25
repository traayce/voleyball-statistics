using ServiceContracts.Services.UserService.Models;

namespace Api.Models.AuthenticationModels
{
    public class UserInfoDomainModel : IUserInfoDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}