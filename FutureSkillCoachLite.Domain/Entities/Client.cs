                    namespace FutureSkillCoachLite.Domain.Entities;
            //entidad cliente con sus respectivas propiedades, incluyendo la relación con Coach
        public class Client
        {
            public int ClientId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Goal { get; set; } = string.Empty;

            public int CoachId { get; set; }

            public Coach? Coach { get; set; }
            public string PasswordHash { get; set; } = string.Empty;
        }
