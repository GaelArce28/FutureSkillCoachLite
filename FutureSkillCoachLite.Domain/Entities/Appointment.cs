            namespace FutureSkillCoachLite.Domain.Entities;

        public class Appointment
        {
            public int AppointmentId { get; set; }

            public DateOnly Date { get; set; }

            public TimeOnly Time { get; set; }

            public string Topic { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public int ClientId { get; set; }

            public Client? Client { get; set; }

            public int CoachId { get; set; }

            public Coach? Coach { get; set; }
        }