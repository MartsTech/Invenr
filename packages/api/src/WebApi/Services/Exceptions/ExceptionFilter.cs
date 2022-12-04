using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Services.Exceptions;

public sealed class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        ProblemDetails problemDetails = new() 
        { 
            Status = 500,
            Title = "Bad Request" 
        };

        context.Result = new JsonResult(problemDetails);

        context.Exception = null!;
    }
}