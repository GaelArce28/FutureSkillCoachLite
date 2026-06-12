using FutureSkillCoachLite.Dto.Auth;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FutureSkillCoachLite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthFacade _authFacade;

    public AuthController(IAuthFacade authFacade)
    {
        _authFacade = authFacade;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto request)
    {
        var user = await _authFacade.LoginAsync(request);

        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Correo o contraseña incorrectos."
            });
        }

        return Ok(user);
    }
}