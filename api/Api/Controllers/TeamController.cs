using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.TeamModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Authentication.Models;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.TeamService.Models;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TeamController: ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            this._teamService = teamService;
        }
        
        [HttpGet]
        public ActionResult<TeamDomainModel> Get(int teamId)
        {
            return Ok(_teamService.Get<TeamDomainModel>(teamId));
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<TeamDomainModel>> Get(int[] teamIds)
        {
            return Ok(_teamService.GetByIds<TeamDomainModel>(teamIds));
        }

        [Authorize(Roles = Role.Secretary)]
        [HttpPost]
        public async Task<ActionResult<TeamDomainModel>> Post([FromBody] TeamCreateModel model)
        {
            var response = await _teamService.Save<TeamDomainModel>(model);
            return Ok(response);
        }
    }
}