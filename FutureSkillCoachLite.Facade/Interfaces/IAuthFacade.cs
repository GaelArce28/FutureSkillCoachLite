using FutureSkillCoachLite.Dto.Auth;

namespace FutureSkillCoachLite.Facade.Interfaces;

public interface IAuthFacade
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request);
}