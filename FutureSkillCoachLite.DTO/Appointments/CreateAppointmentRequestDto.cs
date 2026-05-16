        using System;
        namespace FutureSkillCoachLite.Dto.Appointments;

        public class CreateAppointmentRequestDto
        {
            public DateOnly Date { get; set; }

            public TimeOnly Time { get; set; }

            public string Topic { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public int ClientId { get; set; }

            public int CoachId { get; set; }
        }