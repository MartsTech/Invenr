using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.FeatureManagement;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebAPI.Services.FeatureFlags;

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

        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
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
    
    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app, IConfiguration config)
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
        
        var provider = app.ApplicationServices.GetRequiredService<IApiVersionDescriptionProvider>();
        
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            foreach (var description in provider.ApiVersionDescriptions)
            {
                var basePath = config["ASPNETCORE_BASEPATH"];

                var swaggerEndpoint = !string.IsNullOrEmpty(basePath) 
                    ? $"{basePath}/swagger/{description.GroupName}/swagger.json" 
                    : $"/swagger/{description.GroupName}/swagger.json";

                options.SwaggerEndpoint(swaggerEndpoint, description.GroupName.ToUpperInvariant());
            }
        });

        return app;
    }
}