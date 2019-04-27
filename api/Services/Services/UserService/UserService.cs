using System.Linq;
using System.Threading.Tasks;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using Infrastructure;
using ServiceContracts.Helpers.Extensions;
using ServiceContracts.Services.UserService;
using ServiceContracts.Services.UserService.Models;

namespace Services.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork _unitOfWork;
        
        public UserService(
            IUserRepository userRepository,
            IUnitOfWork _unitOfWork)
        {
            this.userRepository = userRepository;
            this._unitOfWork = _unitOfWork;
        }
        
        public async Task<T> GetUserInfo<T>(int userId) where T: IUserInfoDomainModel, new()
        {
            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new RulesException("Vartotojas tokiu ID neegzistuoja");

            return new T
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            };
        }
        
        public static IUserInfoDomainModel FormModel(UserEntity entity)
        {
            return new UserInfoDomainModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Role = entity.Role
            };
        }

        public async Task<IUserInfoDomainModel> Create<T>(T model) where T : IUserCreateDomainModel
        {
            var user = userRepository.GetAllMatching(x => x.Email ==  model.Email).SingleOrDefault();
            if (user != null)
            {
               throw new RulesException(nameof(model.Email), "Paskyra tokiu el.paštu jau egzistuoja");
            }

            var hash = model.Password.GetHash();
            UserEntity entity = new UserEntity()
            {
                Email = model.Email,
                Name = model.Name,
                Password = hash
            };
            
            userRepository.Add(entity);
            await _unitOfWork.CommitChangesAsync();
           
            return new UserInfoDomainModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Role = entity.Role
            };
        }
    }
}