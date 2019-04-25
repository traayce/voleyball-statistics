using System;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ControllerBaseCommand : ControllerBase
    {
        protected ActionResult Command(Func<object> action)
        {
            if (!ModelState.IsValid)
                throw new RulesException();
            return Ok(action());
        }
    }
}