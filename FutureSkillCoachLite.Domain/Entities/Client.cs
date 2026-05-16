                    namespace FutureSkillCoachLite.Domain.Entities;

        public class Client
        {
            public int ClientId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Goal { get; set; } = string.Empty;

            public int CoachId { get; set; }

            public Coach? Coach { get; set; }
        }
