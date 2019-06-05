using System.Collections.Generic;
using Api.Models.MatchPointModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts.Services.AuthenticationService.Models;
using ServiceContracts.Services.MatchServices.MatchPointService;
using ServiceContracts.Services.MatchServices.MatchPointService.Models;
using Services.Services.Base;

namespace Api.Controllers.MatchControllers
{
    [Authorize]
    [Route("api/matches/[controller]")]
    public class MatchPointsController: ControllerBaseCommand
    {
        private readonly IMatchPointService _matchPointService;

        public MatchPointsController(IMatchPointService matchPointService, ITransactedCaller executor) : base(executor)
        {
            _matchPointService = matchPointService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<MatchPointDomainModel>> Get(int[] ids)
        {
            return Ok(_matchPointService.GetByIds<MatchPointDomainModel>(ids));
        }
        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return Command<object>(() =>
            {
                _matchPointService.Delete(id);
                return null;
            });
        }

        [HttpPost]
        [Authorize(Roles = Role.Secretary)]
        public ActionResult<MatchPointDomainModel> Post([FromBody] MatchPointCreateModel model)
        {
            return CommandAsync( async () => await _matchPointService.Save<MatchPointsSummaryDomainModel>(model));
        }
    }
}