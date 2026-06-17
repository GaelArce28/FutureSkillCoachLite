            namespace FutureSkillCoachLite.Dto.Coaches;


        // ESTA CLASE REPRESENTA LOS DATOS QUE EL FRONT END ENVIA PPARA CREAR UN NUEVO COACH
        public class CreateCoachRequestDto
        {
            public string FullName { get; set; } = string.Empty;

            public string Specialty { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }