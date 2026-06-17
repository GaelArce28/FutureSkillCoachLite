        namespace FutureSkillCoachLite.Domain.Entities;
        //entidad coach con sus respectivas propiedades
        public class Coach
        {
            public int CoachId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Specialty { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;
            public string PasswordHash { get; set; } = string.Empty;
        }