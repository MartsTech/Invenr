using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.FeatureManagement;
using WebApi.Services.FeatureFlags;

namespace WebApi.Services.Authentication;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration config)
    {
        var featureManager = services.BuildServiceProvider()
            .GetRequiredService<IFeatureManager>();
        
        var isEnabled = featureManager
            .IsEnabledAsync(nameof(FeatureFlagsList.Authentication))
            .ConfigureAwait(false)
            .GetAwaiter()
            .GetResult();

        if (isEnabled)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(config.GetSection("AzureAdB2C"));
        }

        return services;
    }
}