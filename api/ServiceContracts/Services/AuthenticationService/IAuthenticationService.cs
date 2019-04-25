using System.Threading.Tasks;
using ServiceContracts.Services.AuthenticationService.Models;

namespace ServiceContracts.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        Task<T> Authenticate<T>(string name, string password) where T: IUserLoginDomainModel, new();
        string GetToken(int id, string role);
    }
}