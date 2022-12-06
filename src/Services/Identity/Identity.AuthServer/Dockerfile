FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/Identity/Identity.AuthServer/Identity.AuthServer.csproj", "Identity.AuthServer/"]
RUN dotnet restore "Services/Identity/Identity.AuthServer/Identity.AuthServer.csproj"
COPY . .
WORKDIR "/src/Identity.AuthServer"
RUN dotnet build "Identity.AuthServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Identity.AuthServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Identity.AuthServer.dll"]
