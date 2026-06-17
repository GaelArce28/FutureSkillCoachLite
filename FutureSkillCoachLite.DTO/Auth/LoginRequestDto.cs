namespace FutureSkillCoachLite.Dto.Auth;

public class LoginRequestDto
 // ESTA CLASE REPRESENTA LOS DATOS QUE EL FRONTEND ENVIA PARA INICIAR SESIÓN
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}