using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.TeamModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.TeamService.Models;
using Services.Services.Base;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TeamsController: ControllerBaseCommand
    {
        private readonly ITeamService _teamService;

        public TeamsController(ITeamService teamService, ITransactedCaller executor) : base(executor)
        {
            _teamService = teamService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<TeamDomainModel>> Get(int[] teamIds)
        {
            return Ok(_teamService.GetByIds<TeamDomainModel>(teamIds));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpPost]
        public ActionResult<TeamDomainModel> Post([FromBody] TeamCreateModel model)
        {
            return CommandAsync( async () => await _teamService.Save<TeamDomainModel>(model));
        }
        
        [HttpPatch("{id}")]
        [Authorize(Roles = Role.Secretary)]
        public async Task<ActionResult<TeamDomainModel>> Patch([FromRoute] int id,
            [FromBody] JsonPatchDocument<TeamCreateModel> personPatch)
        {
            var model = await _teamService.GetCreateModel<TeamCreateModel>(id);
            personPatch.ApplyTo(model);
            return CommandAsync( async () => await _teamService.Save<TeamDomainModel>(model));
        }
        
        [Authorize(Roles = Role.Secretary)]
        [HttpDelete]
        public ActionResult Delete(int[] teamIDs)
        {
            return Command<IActionResult>(() =>
                {
                    foreach (int teamId in teamIDs)
                    {
                        _teamService.Delete(teamId);
                    }

                    return null;
                }
            );
        }
    }
}