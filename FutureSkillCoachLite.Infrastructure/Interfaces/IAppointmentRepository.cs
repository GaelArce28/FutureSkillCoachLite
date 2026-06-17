using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.Infrastructure.Interfaces;
// esta  lase es la interfaz del repositorio de citas. operaciones CRUD y validar la existencia de clientes y coaches.
public interface IAppointmentRepository
{
    Task<List<Appointment>> GetAllAsync();

    Task<Appointment?> GetByIdAsync(int appointmentId);

    Task<Appointment> AddAsync(Appointment appointment);

    Task<Appointment?> UpdateAsync(Appointment appointment);

    Task<bool> DeleteAsync(int appointmentId);

    Task<bool> ClientExistsAsync(int clientId);

    Task<bool> CoachExistsAsync(int coachId);
}