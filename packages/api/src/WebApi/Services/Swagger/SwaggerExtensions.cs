using Microsoft.FeatureManagement;
using WebAPI.Services.FeatureFlags;
using Microsoft.OpenApi.Models;

namespace WebAPI.Services.Swagger;

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
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer",
                new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    BearerFormat = "JWT",
                });
            
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

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