using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataContracts;
using Infrastructure;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ServiceContracts.Services.AuthenticationService;
using ServiceContracts.Services.AuthenticationService.Models;
using Services.Helpers.Extensions;

namespace Services.Services.AuthenticationService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        
        public AuthenticationService(
            IUserRepository userRepository,
            IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<T> Authenticate<T>(string name, string password) where T: IUserLoginDomainModel, new()
        {
            var users = await _userRepository.GetAllAsync();
            var user = users.SingleOrDefault(x => x.Email == name && x.Password == password.GetHash());

            if (user == null)
                throw new RulesException("Paskyra tokiais duomenimis neegzistuoja");

            return new T
            {
                Token = GetToken(user.Id, user.Role),
                Name = name
            };
        }

        public string GetToken(int id, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
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
    }
}