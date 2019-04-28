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
    [Route("api/match/[controller]")]
    public class PlayerPointController : ControllerBaseCommand
    {
        private readonly IPlayerPointService _playerPointService;

        public PlayerPointController(IPlayerPointService playerPointService, ITransactedCaller executor) :
            base(executor)
        {
            _playerPointService = playerPointService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlayerPointDomainModel>> Get(int[] playerIds)
        {
            return Ok(_playerPointService.GetByIds<PlayerPointDomainModel>(playerIds));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<PlayerPointDomainModel> Post([FromBody] PlayerPointCreateModel model)
        {
            return Command(async () => await _playerPointService.Save<PlayerPointDomainModel>(model));
        }
    }
}