using Microsoft.FeatureManagement;
using WebApi.Services.FeatureFlags;

namespace WebApi.Services.Swagger;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        var featureManager = services.BuildServiceProvider()
            .GetRequiredService<IFeatureManager>();
        
        var isEnabled = featureManager
            .IsEnabledAsync(nameof(FeatureFlagsList.Swagger))
            .ConfigureAwait(false)
            .GetAwaiter()
            .GetResult();

        if (!isEnabled)
        {
            return services;
        }
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }
    
    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app)
    {
        var featureManager = app.ApplicationServices
            .GetRequiredService<IFeatureManager>();
        
        var isEnabled = featureManager
            .IsEnabledAsync(nameof(FeatureFlagsList.Swagger))
            .ConfigureAwait(false)
            .GetAwaiter()
            .GetResult();

        if (!isEnabled)
        {
            return app;
        }
        
        app.UseSwagger();
        app.UseSwaggerUI();

        return app;
    }
}