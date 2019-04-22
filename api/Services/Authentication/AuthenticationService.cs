using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using Infrastructure;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ServiceContracts.Authentication;
using ServiceContracts.Authentication.Models;

namespace Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository userRepository;
        private readonly AppSettings appSettings;
        private readonly IUnitOfWork _unitOfWork;
        
        public AuthenticationService(
            IUserRepository userRepository,
            IOptions<AppSettings> appSettings,
            IUnitOfWork _unitOfWork)
        {
            this.userRepository = userRepository;
            this.appSettings = appSettings.Value;
            this._unitOfWork = _unitOfWork;
        }
        
        public async Task<T> GetUserInfo<T>(int userId) where T: IUserInfoDomainModel, new()
        {
            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new RulesException("Vartotojas tokiu ID neegzistuoja");

            return new T
            {
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            };
        }
        
        public async Task<T> Authenticate<T>(string name, string password) where T: IUserDomainModel, new()
        {
            var users = await userRepository.GetAllAsync();
            var user = users.SingleOrDefault(x => x.Name == name && x.Password == GetHash(password));

            if (user == null)
                throw new RulesException("Paskyra tokiais duomenimis neegzistuoja");

            return new T
            {
                Token = GetToken(user.Id, user.Role),
                Name = name
            };
        }
        
        public async Task<string> Register<T>(T model) where T : IUserRegistrationDomainModel
        {
            var user = userRepository.GetAllMatching(x => x.Email ==  model.Email).SingleOrDefault();
            if (user != null)
            {
               throw new RulesException(nameof(model.Email), "Paskyra tokiu el.paštu jau egzistuoja");
            }

            var hash = GetHash(model.Password);
            UserEntity entity = new UserEntity()
            {
                Email = model.Email,
                Name = model.Name,
                Password = hash
            };
            
            userRepository.Add(entity);
            await _unitOfWork.CommitChangesAsync();
           
            return GetToken(entity.Id, entity.Role);
        }

        private string GetToken(int id, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] 
                {
                    new Claim(ClaimTypes.Name, id.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }
        
        private static string GetHash(string text)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}