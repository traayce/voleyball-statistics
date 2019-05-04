using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.MatchPlayerModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.MatchPlayerService;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/matches/[controller]")]
    public class MatchPlayersController : ControllerBaseCommand
    {
        private readonly IMatchPlayerService _matchPlayerService;

        public MatchPlayersController(IMatchPlayerService matchPlayerService, ITransactedCaller executor) :
            base(executor)
        {
            _matchPlayerService = matchPlayerService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MatchPlayerDomainModel>> Get(int[] playerIds)
        {
            return Ok(_matchPlayerService.GetByIds<MatchPlayerDomainModel>(playerIds));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<MatchPlayerDomainModel> Post([FromBody] MatchPlayerCreateModel model)
        {
            return Command(async () => await _matchPlayerService.Save<MatchPlayerDomainModel>(model));
        }
        
        [HttpPatch("{id}")]
        [Authorize(Roles = Role.Secretary)]
        public async Task<ActionResult<MatchPlayerDomainModel>> Patch([FromRoute] int id,
            [FromBody] JsonPatchDocument<MatchPlayerCreateModel> personPatch)
        {
            var model = await _matchPlayerService.GetCreateModel<MatchPlayerCreateModel>(id);
            personPatch.ApplyTo(model);
            return Command( async () => await _matchPlayerService.Save<MatchPlayerDomainModel>(model));
        }
    }
}