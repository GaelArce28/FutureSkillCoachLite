using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.Infrastructure.Data;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FutureSkillCoachLite.Infrastructure.Repositories;

public class ClientRepository : IClientRepository
{
    private readonly AppDbContext _context;

    public ClientRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Client>> GetAllAsync()
    {
        return await _context.Clients
            .Include(client => client.Coach)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Client?> GetByIdAsync(int clientId)
    {
        return await _context.Clients
            .Include(client => client.Coach)
            .FirstOrDefaultAsync(client => client.ClientId == clientId);
    }

    public async Task<Client?> GetByEmailAsync(string email)
    {
        return await _context.Clients
            .Include(client => client.Coach)
            .FirstOrDefaultAsync(client => client.Email.ToLower() == email.ToLower());
    }

    public async Task<Client> AddAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        return client;
    }

    public async Task<Client?> UpdateAsync(Client client)
    {
        var existingClient = await _context.Clients
            .FirstOrDefaultAsync(c => c.ClientId == client.ClientId);

        if (existingClient == null)
        {
            return null;
        }

        existingClient.FullName = client.FullName;
        existingClient.Email = client.Email;
        existingClient.Goal = client.Goal;
        existingClient.CoachId = client.CoachId;
        existingClient.PasswordHash = client.PasswordHash;

        await _context.SaveChangesAsync();

        return existingClient;
    }

public async Task<bool> DeleteAsync(int clientId)
{
    var client = await _context.Clients
        .FirstOrDefaultAsync(c => c.ClientId == clientId);

    if (client == null)
    {
        return false;
    }

    var appointments = await _context.Appointments
        .Where(a => a.ClientId == clientId)
        .ToListAsync();

    _context.Appointments.RemoveRange(appointments);
    _context.Clients.Remove(client);

    await _context.SaveChangesAsync();

    return true;
}

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _context.Clients
            .AnyAsync(client => client.Email == email);
    }
}