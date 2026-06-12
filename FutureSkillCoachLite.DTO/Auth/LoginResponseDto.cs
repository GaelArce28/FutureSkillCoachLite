namespace FutureSkillCoachLite.Dto.Auth;

public class LoginResponseDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public int? ClientId { get; set; }

    public int? CoachId { get; set; }
}