            namespace FutureSkillCoachLite.Dto.Clients;
        // ESTA CLASE REPRESENTA LOS DATOS QUE EL BACKEND DEVUELVE AL FRONTEND CUANDO SE SOLICITA INFORMACIÓN SOBRE UN CLIENTE
        public class ClientResponseDto
        {
            public int ClientId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Goal { get; set; } = string.Empty;

            public int CoachId { get; set; }

            public string CoachName { get; set; } = string.Empty;
        }
