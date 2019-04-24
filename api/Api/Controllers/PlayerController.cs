using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.PlayerModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Authentication.Models;
using ServiceContracts.Services.PlayerService;
using ServiceContracts.Services.PlayerService.Models;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PlayerController: ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            this._playerService = playerService;
        }
        
        [HttpGet]
        public ActionResult<PlayerDomainModel> Get(int playerId)
        {
            return Ok(_playerService.Get<PlayerDomainModel>(playerId));
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<PlayerDomainModel>> Get(int[] playerIds)
        {
            return Ok(_playerService.GetByIds<PlayerDomainModel>(playerIds));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpPost]
        public async Task<ActionResult<IUserDomainModel>> Post([FromBody] PlayerCreateModel model)
        {
            var response = await _playerService.Save<PlayerDomainModel>(model);
            return Ok(response);
        }
    }
}