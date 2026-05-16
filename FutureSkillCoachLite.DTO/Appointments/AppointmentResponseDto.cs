using System;
            namespace FutureSkillCoachLite.Dto.Appointments;

        public class AppointmentResponseDto
        {
            public int AppointmentId { get; set; }

            public DateOnly Date { get; set; }

            public TimeOnly Time { get; set; }

            public string Topic { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public int ClientId { get; set; }

            public string ClientName { get; set; } = string.Empty;

            public int CoachId { get; set; }

            public string CoachName { get; set; } = string.Empty;
        }