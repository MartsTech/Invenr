using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Services.Logging;

public static class LoggingExtensions
{
    public static IServiceCollection AddInvalidRequestLogging(this IServiceCollection services)
    {
        services.Configure<ApiBehaviorOptions>(opt =>
        {
            opt.InvalidModelStateResponseFactory = actionContext =>
            {
                var logger = actionContext
                    .HttpContext
                    .RequestServices
                    .GetRequiredService<ILogger<Program>>();

                var errors = actionContext.ModelState
                    .Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .ToList();

                var jsonModelState = JsonSerializer.Serialize(errors);

                logger.LogWarning("Invalid request", jsonModelState);

                ValidationProblemDetails problemDetails = new(actionContext.ModelState);

                return new BadRequestObjectResult(problemDetails);
            };
        });

        return services;
    }
}