using WebAPI.Services.Controllers;
using WebAPI.Services.Cors;
using WebAPI.Services.FeatureFlags;
using WebAPI.Services.Logging;
using WebAPI.Services.Swagger;
using WebAPI.Services.Versioning;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFeatureFlags(builder.Configuration);
builder.Services.AddInvalidRequestLogging();
builder.Services.AddVersioning();
builder.Services.AddSwagger();
builder.Services.AddCustomControllers();
builder.Services.AddCustomCors();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseCustomCors();

app.UseHttpsRedirection();

app.UseCustomSwagger(app.Configuration);

app.UseAuthorization();

app.MapControllers();

app.Run();