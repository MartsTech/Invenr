using WebAPI.Services.Controllers;
using WebAPI.Services.FeatureFlags;
using WebAPI.Services.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFeatureFlags(builder.Configuration);
builder.Services.AddCustomControllers();
builder.Services.AddSwagger();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCustomSwagger();

app.UseAuthorization();

app.MapControllers();

app.Run();