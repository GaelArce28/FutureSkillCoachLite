using FutureSkillCoachLite.Domain;
using FutureSkillCoachLite.DomainService;
using FutureSkillCoachLite.DTO;

namespace FutureSkillCoachLite.Facade
{
    public class AppointmentFacade
    {
        private readonly AppointmentService _service;

        public AppointmentFacade(AppointmentService service)
        {
            _service = service;
        }

        public async Task<Appointment> CreateAppointment(CreateAppointmentDTO dto)
        {
            return await _service.CreateAppointment(dto);
        }
    }
}