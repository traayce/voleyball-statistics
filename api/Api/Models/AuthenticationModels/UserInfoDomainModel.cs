using ServiceContracts.Authentication.Models;

namespace Api.Models.AuthenticationModels
{
    public class UserInfoDomainModel : IUserInfoDomainModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}