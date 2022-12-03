using WebApi.Services.Authentication;
using WebApi.Services.Controllers;
using WebApi.Services.FeatureFlags;
using WebApi.Services.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFeatureFlags(builder.Configuration);
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddCustomControllers();
builder.Services.AddSwagger();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCustomSwagger();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();