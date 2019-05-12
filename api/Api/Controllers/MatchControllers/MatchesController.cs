using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.MatchModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.MatchService;
using ServiceContracts.Services.MatchServices.MatchService.Models;
using ServiceContracts.Services.MatchServices.MatchService.Models.Statistics;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Route("api/matches/")]
    public class MatchesController: ControllerBaseCommand
    {
        private readonly IMatchService _matchService;
        private readonly IMatchStatisticsService _matchStatisticsService;

        public MatchesController(IMatchService matchService, IMatchStatisticsService matchStatisticsService, ITransactedCaller executor) : base(executor)
        {
            _matchService = matchService;
            _matchStatisticsService = matchStatisticsService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<MatchDomainModel>> Get(int[] matchIds)
        {
            return Ok(matchIds.Any() ? _matchService.GetByIds<MatchDomainModel>(matchIds) : _matchService.GetList<MatchDomainModel>());
        }
        
        [HttpGet("{id}/statistics")]
        public async Task<ActionResult<IEnumerable<MatchDomainModel>>> Get(int id)
        {
            return Ok(await _matchStatisticsService.GetStatistics<MatchStatisticsDomainModel>(id));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<MatchDomainModel> Post([FromBody] MatchCreateModel model)
        {
            return Command( async () => await _matchService.Save<MatchDomainModel>(model));
        }
        
        [HttpPatch("{id}")]
        [Authorize(Roles = Role.Secretary)]
        public async Task<ActionResult<MatchDomainModel>> Patch([FromRoute] int id,
            [FromBody] JsonPatchDocument<MatchCreateModel> personPatch)
        {
            var model = await _matchService.GetCreateModel<MatchCreateModel>(id);
            personPatch.ApplyTo(model);
            return Command( async () => await _matchService.Save<MatchDomainModel>(model));
        }
    }
}