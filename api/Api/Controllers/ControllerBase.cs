using System;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Services.Services.Base;

namespace Api.Controllers
{
    public class ControllerBaseCommand : ControllerBase
    {
        private readonly ITransactedCaller _executor;

        public ControllerBaseCommand(ITransactedCaller executor)
        {
            _executor = executor;
        }
        protected ActionResult Command<T>(Func<Task<T>> action)
        {
            if (!ModelState.IsValid)
                throw new RulesException();

            var result = _executor.Execute(action);
            return Ok(result);
        }
    }
}