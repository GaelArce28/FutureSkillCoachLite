            namespace FutureSkillCoachLite.Dto.Coaches;



        public class CreateCoachRequestDto
        {
            public string FullName { get; set; } = string.Empty;

            public string Specialty { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;
        }