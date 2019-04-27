/*using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.TeamModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Authentication.Models;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.TeamService.Models;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/match/")]
    public class MatchController: ControllerBaseCommand
    {
        private readonly ITeamService _teamService;

        public MatchController(ITeamService teamService)
        {
            this._teamService = teamService;
        }
        
        [HttpGet("{matchId}")]
        public ActionResult<IEnumerable<TeamDomainModel>> Get(int matchId)
        {
            return Ok(_teamService.GetByIds<TeamDomainModel>(matchId));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpPost]
        public ActionResult<TeamDomainModel> Post([FromBody] TeamCreateModel model)
        {
            return Command((Func<Task<object>>) (async () => await _teamService.Save<TeamDomainModel>(model)));
        }
    }
}*/