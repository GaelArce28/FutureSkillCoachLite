using FutureSkillCoachLite.Domain;
using FutureSkillCoachLite.DTO;
using FutureSkillCoachLite.Infrastructure;

namespace FutureSkillCoachLite.DomainService
{
    public class AppointmentService
    {
        private readonly AppointmentRepository _repository;

        public AppointmentService(AppointmentRepository repository)
        {
            _repository = repository;
        }

        public async Task<Appointment> CreateAppointment(CreateAppointmentDTO dto)
        {
            if (dto.ClientId <= 0)
                throw new Exception("Client is required");

            if (dto.CoachId <= 0)
                throw new Exception("Coach is required");

            var appointment = new Appointment
            {
                ClientId = dto.ClientId,
                CoachId = dto.CoachId,
                Topic = dto.Topic,
                AppointmentDate = dto.AppointmentDate,
                Status = "Pending"
            };

            return await _repository.CreateAsync(appointment);
        }
    }
}