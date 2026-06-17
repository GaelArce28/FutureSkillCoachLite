using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.DomainService.Interfaces;

public interface IAppointmentService
{
    // metodos get

    Task<List<Appointment>> GetAllAsync();

    Task<Appointment?> GetByIdAsync(int appointmentId);
    
// metodos post, put, delete
    Task<Appointment> CreateAsync(Appointment appointment);

    Task<Appointment?> UpdateAsync(Appointment appointment);

    Task<bool> DeleteAsync(int appointmentId);
}