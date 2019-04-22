using System;
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
            return Ok(_authenticationService.GetUserInfo<UserInfoDomainModel>(Int32.Parse(User.Identity.Name)));
        }

        [HttpPost]
        public async Task<ActionResult<IUserDomainModel>> Post([FromBody] UserLoginModel model)
        {
            var response = await _authenticationService.Authenticate<UserDomainModel>(model.Name, model.Password);
            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<string>> Put([FromBody] UserRegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(await _authenticationService.Register(model));
        }
}
}
