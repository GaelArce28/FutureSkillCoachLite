using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.Infrastructure.Data;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FutureSkillCoachLite.Infrastructure.Repositories;

public class CoachRepository : ICoachRepository
{
    private readonly AppDbContext _context;

    public CoachRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Coach>> GetAllAsync()
    {
        return await _context.Coaches
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Coach?> GetByIdAsync(int coachId)
    {
        return await _context.Coaches
            .FirstOrDefaultAsync(coach => coach.CoachId == coachId);
    }

    public async Task<Coach?> GetByEmailAsync(string email)
    {
        return await _context.Coaches
            .FirstOrDefaultAsync(coach => coach.Email.ToLower() == email.ToLower());
    }

    public async Task<Coach> AddAsync(Coach coach)
    {
        _context.Coaches.Add(coach);
        await _context.SaveChangesAsync();

        return coach;
    }

    public async Task<Coach?> UpdateAsync(Coach coach)
    {
        var existingCoach = await _context.Coaches
            .FirstOrDefaultAsync(c => c.CoachId == coach.CoachId);

        if (existingCoach == null)
        {
            return null;
        }

        existingCoach.FullName = coach.FullName;
        existingCoach.Specialty = coach.Specialty;
        existingCoach.Email = coach.Email;

        if (!string.IsNullOrWhiteSpace(coach.PasswordHash))
        {
            existingCoach.PasswordHash = coach.PasswordHash;
        }

        await _context.SaveChangesAsync();

        return existingCoach;
    }

    public async Task<bool> DeleteAsync(int coachId)
    {
        var coach = await _context.Coaches
            .FirstOrDefaultAsync(c => c.CoachId == coachId);

        if (coach == null)
        {
            return false;
        }

        var tieneClientesAsignados = await _context.Clients
            .AnyAsync(c => c.CoachId == coachId);

        if (tieneClientesAsignados)
        {
            throw new InvalidOperationException(
                "No se puede eliminar este entrenador porque tiene clientes asignados."
            );
        }

        var appointments = await _context.Appointments
            .Where(a => a.CoachId == coachId)
            .ToListAsync();

        _context.Appointments.RemoveRange(appointments);
        _context.Coaches.Remove(coach);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _context.Coaches
            .AnyAsync(coach => coach.Email == email);
    }
}