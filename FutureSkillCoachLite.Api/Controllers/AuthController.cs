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
    private readonly IConfiguration _configuration;

    public AuthController(
        IAuthFacade authFacade,
        JwtService jwtService,
        IConfiguration configuration)
    {
        _authFacade = authFacade;
        _jwtService = jwtService;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto request)
    {
        var adminEmail = _configuration["AdminUser:Email"];
        var adminPassword = _configuration["AdminUser:Password"];

        if (
            request.Email == adminEmail &&
            request.Password == adminPassword
        )
        {
            var adminUser = new LoginResponseDto
            {
             
                FullName = "Administrador",
                Email = adminEmail ?? "",
                Role = "Admin"
            };

            var adminJwtResult = _jwtService.GenerateToken(adminUser);

            adminUser.Token = adminJwtResult.Token;
            adminUser.ExpiresAt = adminJwtResult.ExpiresAt;

            return Ok(adminUser);
        }

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