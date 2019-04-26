using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.TeamModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.TeamService.Models;
using Services.Services.Base;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TeamController: ControllerBaseCommand
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService, ITransactedCaller executor) : base(executor)
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
            return Command( async () => await _teamService.Save<TeamDomainModel>(model));
        }
    }
}