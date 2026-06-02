using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.DomainService.Interfaces;

public interface IAppointmentService
{
    Task<List<Appointment>> GetAllAsync();

    Task<Appointment?> GetByIdAsync(int appointmentId);

    Task<Appointment> CreateAsync(Appointment appointment);

    Task<Appointment?> UpdateAsync(Appointment appointment);

    Task<bool> DeleteAsync(int appointmentId);
}