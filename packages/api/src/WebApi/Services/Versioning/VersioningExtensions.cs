namespace WebAPI.Services.Versioning;

public static class VersioningExtensions
{
    public static IServiceCollection AddVersioning(this IServiceCollection services)
    {
        services.AddApiVersioning(options => 
        {
            options.ReportApiVersions = true; 
        });
        services.AddVersionedApiExplorer(options => 
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true; 
        });

        return services;
    }
}