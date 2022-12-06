using System.Collections.Generic;

namespace Gateways.API.ConfigurationOptions;

public class OcelotOptions
{
    public OcelotRoutesOptions Routes { get; set; }
}

public class OcelotRoutesOptions : Dictionary<string, OcelotRouteOptions>
{
    
}

public class OcelotRouteOptions
{
    public List<string> UpstreamPathTemplates { get; set; }
    
    public string Downstream { get; set; }
}