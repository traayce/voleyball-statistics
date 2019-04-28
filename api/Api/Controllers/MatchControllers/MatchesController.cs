using System.Collections.Generic;
using Api.Models.MatchModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.MatchService;
using ServiceContracts.Services.MatchServices.MatchService.Models;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/matches/")]
    public class MatchesController: ControllerBaseCommand
    {
        private readonly IMatchService _matchService;

        public MatchesController(IMatchService matchService, ITransactedCaller executor) : base(executor)
        {
            _matchService = matchService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<MatchDomainModel>> Get(int[] matchIds)
        {
            return Ok(_matchService.GetByIds<MatchDomainModel>(matchIds));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<MatchDomainModel> Post([FromBody] MatchCreateModel model)
        {
            return Command( async () => await _matchService.Save<MatchDomainModel>(model));
        }
    }
}