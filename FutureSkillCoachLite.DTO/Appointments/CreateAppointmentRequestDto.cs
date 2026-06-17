        using System;
        namespace FutureSkillCoachLite.Dto.Appointments;
       // ESTA CLASE REPRESENTA LOS DATOS QUE EL FRONTEND ENVIA PARA CREAR UNA NUEVA CITA
        public class CreateAppointmentRequestDto
        {
            public DateOnly Date { get; set; }

            public TimeOnly Time { get; set; }

            public string Topic { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public int ClientId { get; set; }

            public int CoachId { get; set; }
        }