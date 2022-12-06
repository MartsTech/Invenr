FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Gateways.API/Gateways.API.csproj", "Gateways.API/"]
RUN dotnet restore "Gateways.API/Gateways.API.csproj"
COPY . .
WORKDIR "/src/Gateways.API"
RUN dotnet build "Gateways.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Gateways.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gateways.API.dll"]
