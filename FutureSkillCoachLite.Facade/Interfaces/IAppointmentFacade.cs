using FutureSkillCoachLite.Dto.Appointments;

namespace FutureSkillCoachLite.Facade.Interfaces;

public interface IAppointmentFacade
{
    Task<List<AppointmentResponseDto>> GetAllAsync();

    Task<AppointmentResponseDto?> GetByIdAsync(int appointmentId);

    Task<AppointmentResponseDto> CreateAsync(CreateAppointmentRequestDto request);

    Task<AppointmentResponseDto?> UpdateAsync(int appointmentId, CreateAppointmentRequestDto request);

    Task<bool> DeleteAsync(int appointmentId);
}