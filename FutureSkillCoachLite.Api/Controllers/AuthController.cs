using FutureSkillCoachLite.Api.Services;
using FutureSkillCoachLite.Dto.Auth;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FutureSkillCoachLite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthFacade _authFacade;
    private readonly JwtService _jwtService;

    public AuthController(IAuthFacade authFacade, JwtService jwtService)
    {
        _authFacade = authFacade;
        _jwtService = jwtService;
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

        var jwtResult = _jwtService.GenerateToken(user);

        user.Token = jwtResult.Token;
        user.ExpiresAt = jwtResult.ExpiresAt;

        return Ok(user);
    }
}