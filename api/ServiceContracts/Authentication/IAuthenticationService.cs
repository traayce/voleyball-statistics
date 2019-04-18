using System.Threading.Tasks;
using ServiceContracts.Authentication.Models;

namespace ServiceContracts.Authentication
{
    public interface IAuthenticationService
    {
        Task<UserDomainModel> Authenticate(string name, string password);
    }
}