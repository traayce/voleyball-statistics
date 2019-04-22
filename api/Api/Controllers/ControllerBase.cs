using System;
using Api.Models.Product;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public interface ICommand
    {
        IActionResult Execute();
    }

/*    public class CustomCommand : ICommand
    {
        public ProductViewModel Model = new ProductViewModel();

        public IActionResult Execute()
        {
            return Ok();
        }
    }*/
    public class ControllerBaseCommand : ControllerBase
    {
        protected ActionResult Command<TCommand>(Action<TCommand> initCommand, Func<TCommand, ActionResult> success,
                Func<ActionResult> failure)
                where TCommand : ICommand, new()
            {
                var command = new TCommand();
                initCommand(command);
                if (!ModelState.IsValid)
                    return failure();
                try
                {
                    command.Execute();
                    return success(command);
                }
                catch (Exception e)
                {
                    return failure();
                }
            }
    }
}