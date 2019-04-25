using System.Threading.Tasks;
using ServiceContracts.Services.UserService.Models;

namespace ServiceContracts.Services.UserService
{
    public interface IUserService
    {
        Task<IUserInfoDomainModel> Create<T>(T model) where T : IUserCreateDomainModel;
        Task<T> GetUserInfo<T>(int userId) where T : IUserInfoDomainModel, new();
    }
}