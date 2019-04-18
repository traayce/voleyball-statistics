using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.AuthenticationModels;
using Api.Models.Product;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Authentication;
using ServiceContracts.Authentication.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        
        [Authorize]
        [HttpGet]
        public ActionResult<UserDomainModel> Get()
        {
            return Ok(new UserDomainModel()
            {
                Name = User.Identity.Name,
                Token = ""
            });
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserLoginModel model)
        {
            var response = await _authenticationService.Authenticate(model.Name, model.Password);
            return Ok(response);
        }
    }
}
