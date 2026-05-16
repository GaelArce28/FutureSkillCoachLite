
        namespace FutureSkillCoachLite.Dto.Clients;

        public class CreateClientRequestDto
        {
            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Goal { get; set; } = string.Empty;

            public int CoachId { get; set; }
        }