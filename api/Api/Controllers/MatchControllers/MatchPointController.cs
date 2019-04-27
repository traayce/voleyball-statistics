using System.Collections.Generic;
using Api.Models.MatchPointModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.MatchPointService;
using ServiceContracts.Services.MatchServices.MatchPointService.Models;
using ServiceContracts.Services.MatchServices.MatchService.Models;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/match/[controller]")]
    public class MatchPointController: ControllerBaseCommand
    {
        private readonly IMatchPointService _matchPointService;

        public MatchPointController(IMatchPointService matchPointService, ITransactedCaller executor) : base(executor)
        {
            _matchPointService = matchPointService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<MatchPointDomainModel>> Get(int[] matchIds)
        {
            return Ok(_matchPointService.GetByIds<MatchPointDomainModel>(matchIds));
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<MatchPointDomainModel> Post([FromBody] MatchPointCreateModel model)
        {
            return Command( async () => await _matchPointService.Save<MatchPointDomainModel>(model));
        }
    }
}