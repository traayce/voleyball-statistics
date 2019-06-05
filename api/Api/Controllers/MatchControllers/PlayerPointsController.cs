using System.Collections.Generic;
using Api.Models.PlayerPointModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.PlayerPointService;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/matches/[controller]")]
    public class PlayerPointsController : ControllerBaseCommand
    {
        private readonly IPlayerPointService _playerPointService;

        public PlayerPointsController(IPlayerPointService playerPointService, ITransactedCaller executor) :
            base(executor)
        {
            _playerPointService = playerPointService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlayerPointDomainModel>> Get(int[] ids)
        {
            return Ok(_playerPointService.GetByIds<PlayerPointDomainModel>(ids));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<PlayerPointDomainModel> Post([FromBody] PlayerPointCreateModel model)
        {
            return CommandAsync(async () => await _playerPointService.Save<PlayerPointDomainModel>(model));
        }
    }
}