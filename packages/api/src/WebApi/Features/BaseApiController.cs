using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

[Authorize]
[ApiController]
[Route("api/[controller]")]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public abstract class BaseApiController : ControllerBase
{
    
}