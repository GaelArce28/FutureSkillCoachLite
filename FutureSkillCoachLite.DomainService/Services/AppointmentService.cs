using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;

namespace FutureSkillCoachLite.DomainService.Services;

    //esta clase maneja toda la logica de negocio relacionada con las citas, incluyendo la validación de datos y la interacción con el repositorio de citas.
public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepository;

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
        if (appointment.ClientId <= 0)
        {
            throw new InvalidOperationException("Client is required.");
        }

        if (appointment.CoachId <= 0)
        {
            throw new InvalidOperationException("Coach is required.");
        }

        if (string.IsNullOrWhiteSpace(appointment.Topic))
        {
            throw new InvalidOperationException("Topic is required.");
        }

        var clientExists = await _appointmentRepository.ClientExistsAsync(appointment.ClientId);

        if (!clientExists)
        {
            throw new InvalidOperationException("Client does not exist.");
        }

        var coachExists = await _appointmentRepository.CoachExistsAsync(appointment.CoachId);

        if (!coachExists)
        {
            throw new InvalidOperationException("Coach does not exist.");
        }

        if (string.IsNullOrWhiteSpace(appointment.Status))
        {
            appointment.Status = "Pending";
        }

        return await _appointmentRepository.AddAsync(appointment);
    }

    public async Task<Appointment?> UpdateAsync(Appointment appointment)
    {
        if (appointment.ClientId <= 0)
        {
            throw new InvalidOperationException("Client is required.");
        }

        if (appointment.CoachId <= 0)
        {
            throw new InvalidOperationException("Coach is required.");
        }

        if (string.IsNullOrWhiteSpace(appointment.Topic))
        {
            throw new InvalidOperationException("Topic is required.");
        }

        var clientExists = await _appointmentRepository.ClientExistsAsync(appointment.ClientId);

        if (!clientExists)
        {
            throw new InvalidOperationException("Client does not exist.");
        }

        var coachExists = await _appointmentRepository.CoachExistsAsync(appointment.CoachId);

        if (!coachExists)
        {
            throw new InvalidOperationException("Coach does not exist.");
        }

        if (string.IsNullOrWhiteSpace(appointment.Status))
        {
            appointment.Status = "Pending";
        }

        return await _appointmentRepository.UpdateAsync(appointment);
    }

    public async Task<bool> DeleteAsync(int appointmentId)
    {
        return await _appointmentRepository.DeleteAsync(appointmentId);
    }
}