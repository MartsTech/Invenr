using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace WebApi.Services.Controllers;

public static class ControllersExtensions
{
    public static IServiceCollection AddCustomControllers(this IServiceCollection services)
    {
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