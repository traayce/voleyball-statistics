using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.PlayerModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.PlayerService;
using ServiceContracts.Services.PlayerService.Models;
using Services.Services.Base;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBaseCommand
    {
        private readonly IPlayerService _playerService;

        public PlayersController(IPlayerService playerService, ITransactedCaller executor) : base(executor)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlayerDomainModel>> Get(int[] playerIds)
        {
            return Ok(_playerService.GetByIds<PlayerDomainModel>(playerIds));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpPost]
        public ActionResult<IUserLoginDomainModel> Post([FromBody] PlayerCreateModel model)
        {
            return CommandAsync(async () => await _playerService.Save<PlayerDomainModel>(model));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpDelete]
        public ActionResult Delete(int[] playerIds)
        {
            return Command<IActionResult>(() =>
                {
                    foreach (int playerId in playerIds)
                    {
                        _playerService.Delete(playerId);
                    }

                    return null;
                }
            );
        }
        
        [HttpPatch("{id}")]
        [Authorize(Roles = Role.Secretary)]
        public async Task<ActionResult<PlayerDomainModel>> Patch([FromRoute] int id,
            [FromBody] JsonPatchDocument<PlayerCreateModel> personPatch)
        {
            var model = await _playerService.GetCreateModel<PlayerCreateModel>(id);
            personPatch.ApplyTo(model);
            return CommandAsync( async () => await _playerService.Save<PlayerDomainModel>(model));
        }
    }
}