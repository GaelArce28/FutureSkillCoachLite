using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;

namespace FutureSkillCoachLite.DomainService.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepository;

    private static readonly string[] AllowedStatuses =
    {
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    };

    public AppointmentService(IAppointmentRepository appointmentRepository)
    {
        _appointmentRepository = appointmentRepository;
    }

    public async Task<List<Appointment>> GetAllAsync()
    {
        return await _appointmentRepository.GetAllAsync();
    }

    public async Task<Appointment?> GetByIdAsync(int appointmentId)
    {
        return await _appointmentRepository.GetByIdAsync(appointmentId);
    }

    public async Task<Appointment> CreateAsync(Appointment appointment)
    {
        ValidateAppointment(appointment);

        var clientExists = await _appointmentRepository.ClientExistsAsync(appointment.ClientId);

        if (!clientExists)
        {
            throw new InvalidOperationException("The selected client does not exist.");
        }

        var coachExists = await _appointmentRepository.CoachExistsAsync(appointment.CoachId);

        if (!coachExists)
        {
            throw new InvalidOperationException("The selected coach does not exist.");
        }

        return await _appointmentRepository.AddAsync(appointment);
    }

    public async Task<Appointment?> UpdateAsync(Appointment appointment)
    {
        ValidateAppointment(appointment);

        var clientExists = await _appointmentRepository.ClientExistsAsync(appointment.ClientId);

        if (!clientExists)
        {
            throw new InvalidOperationException("The selected client does not exist.");
        }

        var coachExists = await _appointmentRepository.CoachExistsAsync(appointment.CoachId);

        if (!coachExists)
        {
            throw new InvalidOperationException("The selected coach does not exist.");
        }

        return await _appointmentRepository.UpdateAsync(appointment);
    }

    public async Task<bool> DeleteAsync(int appointmentId)
    {
        return await _appointmentRepository.DeleteAsync(appointmentId);
    }

    private static void ValidateAppointment(Appointment appointment)
    {
        if (string.IsNullOrWhiteSpace(appointment.Topic))
        {
            throw new InvalidOperationException("Topic is required.");
        }

        if (string.IsNullOrWhiteSpace(appointment.Status))
        {
            throw new InvalidOperationException("Status is required.");
        }

        if (!AllowedStatuses.Contains(appointment.Status))
        {
            throw new InvalidOperationException(
                "Status must be Pending, Confirmed, Completed or Cancelled."
            );
        }
    }
}