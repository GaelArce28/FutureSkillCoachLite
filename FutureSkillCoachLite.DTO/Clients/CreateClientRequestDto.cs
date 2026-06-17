
        namespace FutureSkillCoachLite.Dto.Clients;
        //ESTA CLASE REPRESENTA LOS DATOS QUE EL FRONTEND ENVIA PARA CREAR UN NUEVO CLIENTE

        public class CreateClientRequestDto
        {
            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Goal { get; set; } = string.Empty;

            public int CoachId { get; set; }
            public string Password { get; set; } = string.Empty;
        }