using System;
namespace FutureSkillCoachLite.Dto.Coaches;
        // ESTA CLASE REPRESENTA LOS DATOS QUE EL BACKEND DEVUELVE AL FRONTEND CUANDO SE SOLICITA INFORMACIÓN SOBRE UN COACH.
        public class CoachResponseDto
        {
            public int CoachId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Specialty { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;
        }