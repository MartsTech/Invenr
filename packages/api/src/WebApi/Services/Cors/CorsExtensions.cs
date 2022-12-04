namespace WebAPI.Services.Cors;

public static class CorsExtensions
{
    private const string CorsPolicy = "CorsPolicy";
    
    public static IServiceCollection AddCustomCors(this IServiceCollection services)
    {
        services.AddCors(opt =>
        {
            opt.AddPolicy(CorsPolicy, builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return services;
    }
    
    public static IApplicationBuilder UseCustomCors(this IApplicationBuilder app)
    {
        app.UseCors(CorsPolicy);
        return app;
    }
}