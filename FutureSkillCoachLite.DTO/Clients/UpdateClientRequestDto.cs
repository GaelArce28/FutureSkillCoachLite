namespace FutureSkillCoachLite.Dto.Clients;

public class UpdateClientRequestDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Goal { get; set; }
    public int? CoachId { get; set; }

    public string? Password { get; set; }
}