using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataContracts;
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
        
        public AuthenticationService(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            this.userRepository = userRepository;
            this.appSettings = appSettings.Value;
        }
        
        public async Task<UserDomainModel> Authenticate(string username, string password)
        {
            var users = await userRepository.GetAll();
            var user = users.SingleOrDefault(x => x.Name == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return new UserDomainModel
            {
                Token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor)),
                Name = username
            };;
        }
    }
}