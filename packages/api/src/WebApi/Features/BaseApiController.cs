using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Features;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public abstract class BaseApiController : ControllerBase
{
}