using System.IO;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.Utils.Exceptions
{
    public class ExceptionHandlingMiddleware
    {
        public async Task Invoke(HttpContext context)
        {
            var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
            if (exception == null) return;

            var problemDetails = new ProblemDetails
            {
                Title = "An unexpected error occurred!",
                Detail = exception.Message,
                Status = StatusCodes.Status500InternalServerError
            };

            if (exception is RulesException rulesException)
            {
                problemDetails = ValidationProblem(rulesException);
            }

            problemDetails.Instance = context.Request.Path;
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;


            using (var writer = new StreamWriter(context.Response.Body))
            {
                new JsonSerializer().Serialize(writer, problemDetails);
                await writer.FlushAsync().ConfigureAwait(false);
            }
        }

        private static ValidationProblemDetails ValidationProblem(RulesException exception)
        {
            var problem = new ValidationProblemDetails
            {
                Status = exception.StatusCode ?? StatusCodes.Status400BadRequest
            };

            foreach (var errorInfo in exception.Errors)
            {
                problem.Errors.Add(errorInfo.PropertyName.ToLower(), new[] {errorInfo.ErrorMessage});
            }

            return problem;
        }
    }
}