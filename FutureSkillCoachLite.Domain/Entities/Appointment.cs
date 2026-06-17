            namespace FutureSkillCoachLite.Domain.Entities;

            //entidad appointment con sus respectivas propiedades, incluyendo las relaciones con Client y Coach
            

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