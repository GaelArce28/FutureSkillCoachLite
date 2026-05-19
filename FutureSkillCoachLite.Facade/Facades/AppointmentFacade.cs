using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Dto.Appointments;
using FutureSkillCoachLite.Facade.Interfaces;

namespace FutureSkillCoachLite.Facade.Facades;

public class AppointmentFacade : IAppointmentFacade
{
    private readonly IAppointmentService _appointmentService;

    public AppointmentFacade(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    public async Task<List<AppointmentResponseDto>> GetAllAsync()
    {
        var appointments = await _appointmentService.GetAllAsync();

        return appointments.Select(MapToResponse).ToList();
    }

    public async Task<AppointmentResponseDto?> GetByIdAsync(int appointmentId)
    {
        var appointment = await _appointmentService.GetByIdAsync(appointmentId);

        if (appointment == null)
        {
            return null;
        }

        return MapToResponse(appointment);
    }

    public async Task<AppointmentResponseDto> CreateAsync(CreateAppointmentRequestDto request)
    {
        var appointment = new Appointment
        {
            Date = request.Date,
            Time = request.Time,
            Topic = request.Topic,
            Status = request.Status,
            ClientId = request.ClientId,
            CoachId = request.CoachId
        };

        var createdAppointment = await _appointmentService.CreateAsync(appointment);

        return MapToResponse(createdAppointment);
    }

    public async Task<AppointmentResponseDto?> UpdateAsync(
        int appointmentId,
        CreateAppointmentRequestDto request)
    {
        var appointment = new Appointment
        {
            AppointmentId = appointmentId,
            Date = request.Date,
            Time = request.Time,
            Topic = request.Topic,
            Status = request.Status,
            ClientId = request.ClientId,
            CoachId = request.CoachId
        };

        var updatedAppointment = await _appointmentService.UpdateAsync(appointment);

        if (updatedAppointment == null)
        {
            return null;
        }

        return MapToResponse(updatedAppointment);
    }

    public async Task<bool> DeleteAsync(int appointmentId)
    {
        return await _appointmentService.DeleteAsync(appointmentId);
    }

    private static AppointmentResponseDto MapToResponse(Appointment appointment)
    {
        return new AppointmentResponseDto
        {
            AppointmentId = appointment.AppointmentId,
            Date = appointment.Date,
            Time = appointment.Time,
            Topic = appointment.Topic,
            Status = appointment.Status,
            ClientId = appointment.ClientId,
            ClientName = appointment.Client?.FullName ?? string.Empty,
            CoachId = appointment.CoachId,
            CoachName = appointment.Coach?.FullName ?? string.Empty
        };
    }
}