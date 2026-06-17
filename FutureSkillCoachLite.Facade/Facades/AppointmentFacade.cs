using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Dto.Appointments;
using FutureSkillCoachLite.Facade.Interfaces;

namespace FutureSkillCoachLite.Facade.Facades;
    //ESTA CLASE ACTUA COMO UN PUENTE ENTRE LOS CONTROLADORES Y LOS SERVICIOS DE DOMINIO
    // RECIBE LAS SOLICITUDES Y DEVUELVE LOS DTO DE RESPUESTA AL FRONTEND.
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

        return appointments
            .Select(MapToResponseDto)
            .ToList();
    }

    public async Task<AppointmentResponseDto?> GetByIdAsync(int appointmentId)
    {
        var appointment = await _appointmentService.GetByIdAsync(appointmentId);

        return appointment == null
            ? null
            : MapToResponseDto(appointment);
    }

    public async Task<AppointmentResponseDto> CreateAsync(CreateAppointmentRequestDto request)
    {
        var appointment = MapToEntity(request);

        var createdAppointment = await _appointmentService.CreateAsync(appointment);

        return MapToResponseDto(createdAppointment);
    }

    public async Task<AppointmentResponseDto?> UpdateAsync(
        int appointmentId,
        CreateAppointmentRequestDto request)
    {
        var appointment = MapToEntity(request);
        appointment.AppointmentId = appointmentId;

        var updatedAppointment = await _appointmentService.UpdateAsync(appointment);

        return updatedAppointment == null
            ? null
            : MapToResponseDto(updatedAppointment);
    }

    public async Task<bool> DeleteAsync(int appointmentId)
    {
        return await _appointmentService.DeleteAsync(appointmentId);
    }

    private static Appointment MapToEntity(CreateAppointmentRequestDto request)
    {
        return new Appointment
        {
            Date = request.Date,
            Time = request.Time,
            Topic = request.Topic,
            Status = string.IsNullOrWhiteSpace(request.Status) ? "Pending" : request.Status,
            ClientId = request.ClientId,
            CoachId = request.CoachId
        };
    }

    private static AppointmentResponseDto MapToResponseDto(Appointment appointment)
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