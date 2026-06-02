using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.Infrastructure.Data;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FutureSkillCoachLite.Infrastructure.Repositories;

public class AppointmentRepository : IAppointmentRepository
{
    private readonly AppDbContext _context;

    public AppointmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Appointment>> GetAllAsync()
    {
        return await _context.Appointments
            .Include(appointment => appointment.Client)
            .Include(appointment => appointment.Coach)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Appointment?> GetByIdAsync(int appointmentId)
    {
        return await _context.Appointments
            .Include(appointment => appointment.Client)
            .Include(appointment => appointment.Coach)
            .FirstOrDefaultAsync(appointment => appointment.AppointmentId == appointmentId);
    }

    public async Task<Appointment> AddAsync(Appointment appointment)
    {
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(appointment.AppointmentId) ?? appointment;
    }

    public async Task<Appointment?> UpdateAsync(Appointment appointment)
    {
        var existingAppointment = await _context.Appointments
            .FirstOrDefaultAsync(a => a.AppointmentId == appointment.AppointmentId);

        if (existingAppointment == null)
        {
            return null;
        }

        existingAppointment.Date = appointment.Date;
        existingAppointment.Time = appointment.Time;
        existingAppointment.Topic = appointment.Topic;
        existingAppointment.Status = appointment.Status;
        existingAppointment.ClientId = appointment.ClientId;
        existingAppointment.CoachId = appointment.CoachId;

        await _context.SaveChangesAsync();

        return await GetByIdAsync(existingAppointment.AppointmentId);
    }

    public async Task<bool> DeleteAsync(int appointmentId)
    {
        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

        if (appointment == null)
        {
            return false;
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ClientExistsAsync(int clientId)
    {
        return await _context.Clients
            .AnyAsync(client => client.ClientId == clientId);
    }

    public async Task<bool> CoachExistsAsync(int coachId)
    {
        return await _context.Coaches
            .AnyAsync(coach => coach.CoachId == coachId);
    }
}