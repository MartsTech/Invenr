using Microsoft.FeatureManagement;

namespace WebApi.Services.FeatureFlags;

public static class FeatureFlagsExtensions
{
    public static IServiceCollection AddFeatureFlags(this IServiceCollection services, IConfiguration config)
    {
        services.AddFeatureManagement(config);
        
        var featureManager = services.BuildServiceProvider()
            .GetRequiredService<IFeatureManager>();
        
        services.AddMvc()
            .ConfigureApplicationPartManager(apm =>
            {
                apm.FeatureProviders.Add(new FeatureFlagsControllerFeatureProvider(featureManager));
            });
        
        return services;
    }
}