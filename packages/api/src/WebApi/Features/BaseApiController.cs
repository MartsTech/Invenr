using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Features;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
}