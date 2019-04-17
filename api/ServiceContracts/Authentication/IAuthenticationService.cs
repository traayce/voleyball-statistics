using ServiceContracts.Authentication.Models;

namespace ServiceContracts.Authentication
{
    public interface IAuthenticationService
    {
        UserDomainModel Authenticate(string name, string password);
    }
}