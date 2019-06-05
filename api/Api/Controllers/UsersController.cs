using System;
using System.Threading.Tasks;
using Api.Models.AuthenticationModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.UserService;
using Services.Services.Base;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBaseCommand
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        public UsersController(IAuthenticationService authenticationService, IUserService userService, ITransactedCaller executor) : base(executor)
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
        public async Task<ActionResult<IUserLoginDomainModel>> Post([FromBody] UserCreateModel model)
        {
            return CommandAsync( async () => await _userService.Create(model));
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