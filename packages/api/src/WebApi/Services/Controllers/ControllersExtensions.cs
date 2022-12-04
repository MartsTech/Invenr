using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.FeatureManagement;
using WebAPI.Services.Exceptions;
using WebAPI.Services.FeatureFlags;

namespace WebAPI.Services.Controllers;

public static class ControllersExtensions
{
    public static IServiceCollection AddCustomControllers(this IServiceCollection services)
    {
        var featureManager = services
            .BuildServiceProvider()
            .GetRequiredService<IFeatureManager>();
        
        var isErrorFilterEnabled = featureManager
            .IsEnabledAsync(nameof(FeatureFlagsList.ErrorFilter))
            .ConfigureAwait(false)
            .GetAwaiter()
            .GetResult();
        
        services.AddRouting(options =>
        {
            options.LowercaseUrls = true;
        });
        
        services.AddHttpContextAccessor();
        
        services.AddMvc(opt =>
            {
                opt.OutputFormatters.RemoveType<TextOutputFormatter>();
                opt.OutputFormatters.RemoveType<StreamOutputFormatter>();
                opt.RespectBrowserAcceptHeader = true;
                
                if (isErrorFilterEnabled)
                {
                    opt.Filters.Add(new ExceptionFilter());
                }
            })
            .AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
            })
            .AddControllersAsServices();

        return services;
    }
}