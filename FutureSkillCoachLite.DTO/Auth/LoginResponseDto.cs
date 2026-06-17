namespace FutureSkillCoachLite.Dto.Auth;

// ESTA CLASE REPRESENTA LOS DATOS QUE EL BACKEND DEVUELVE AL FRONTEND CUANDO SE SOLICITA INICIAR SESIÓN
public class LoginResponseDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public int? ClientId { get; set; }

    public int? CoachId { get; set; }

    public string Token { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }
}