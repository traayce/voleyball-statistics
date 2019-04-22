using System.Threading.Tasks;
using ServiceContracts.Authentication.Models;

namespace ServiceContracts.Authentication
{
    public interface IAuthenticationService
    {
        Task<T> Authenticate<T>(string name, string password) where T: IUserDomainModel, new();
        Task<string> Register<T>(T model) where T : IUserRegistrationDomainModel;
        Task<T> GetUserInfo<T>(int userId) where T : IUserInfoDomainModel, new();
    }
}