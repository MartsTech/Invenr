using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

[Authorize]
[ApiController]
[Route("api/[controller]")]
[RequiredScope("user")]
public abstract class BaseApiController : ControllerBase
{
    
}