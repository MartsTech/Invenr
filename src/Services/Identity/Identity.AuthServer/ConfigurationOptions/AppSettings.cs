using System.Collections.Generic;
using Identity.AuthServer.ConfigurationOptions.ExternalLogin;
using IdentityServer4.Configuration;
using Microsoft.AspNetCore.Builder;

namespace Identity.AuthServer.ConfigurationOptions;

public class AppSettings : Services.Identity.ConfigurationOptions.AppSettings
{
    public IdentityServerOptions IdentityServer { get; set; }

    public Dictionary<string, string> SecurityHeaders { get; set; }

    public ExternalLoginOptions ExternalLogin { get; set; }

    public CookiePolicyOptions CookiePolicyOptions { get; set; }
}