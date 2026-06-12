using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Dto.Auth;
using FutureSkillCoachLite.Facade.Interfaces;

namespace FutureSkillCoachLite.Facade.Facades;

public class AuthFacade : IAuthFacade
{
    private readonly IClientService _clientService;
    private readonly ICoachService _coachService;

    public AuthFacade(IClientService clientService, ICoachService coachService)
    {
        _clientService = clientService;
        _coachService = coachService;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }

        var email = request.Email.Trim();

        var client = await _clientService.GetByEmailAsync(email);

        if (client != null &&
            !string.IsNullOrWhiteSpace(client.PasswordHash) &&
            BCrypt.Net.BCrypt.Verify(request.Password, client.PasswordHash))
        {
            return new LoginResponseDto
            {
                Id = client.ClientId,
                ClientId = client.ClientId,
                FullName = client.FullName,
                Email = client.Email,
                Role = "Client",
                CoachId = client.CoachId
            };
        }

        var coach = await _coachService.GetByEmailAsync(email);

        if (coach != null &&
            !string.IsNullOrWhiteSpace(coach.PasswordHash) &&
            BCrypt.Net.BCrypt.Verify(request.Password, coach.PasswordHash))
        {
            return new LoginResponseDto
            {
                Id = coach.CoachId,
                CoachId = coach.CoachId,
                FullName = coach.FullName,
                Email = coach.Email,
                Role = "Coach"
            };
        }

        return null;
    }
}