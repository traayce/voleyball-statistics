using System;
using System.Threading.Tasks;
using Api.Models.AuthenticationModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.UserService;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        public UserController(IAuthenticationService authenticationService, IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserInfoDomainModel>> Get()
        {
            return Ok(await _userService.GetUserInfo<UserInfoDomainModel>(Int32.Parse(User.Identity.Name)));
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfoDomainModel>> Get([FromRoute] int id)
        {
            return Ok(await _userService.GetUserInfo<UserInfoDomainModel>(id));
        }

        [HttpPost]
        public async Task<ActionResult<IUserLoginDomainModel>> Post([FromBody] UserLoginModel model)
        {
            var response = await _authenticationService.Authenticate<UserLoginDomainModel>(model.Name, model.Password);
            return Ok(response);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<UserInfoDomainModel>> Patch([FromRoute] int id,
            [FromBody] JsonPatchDocument<UserInfoDomainModel> personPatch)
        {
            //not yet implemented
            return Ok();
        }
    }
}