using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.Infrastructure.Interfaces;

public interface IClientRepository
{
    Task<List<Client>> GetAllAsync();

    Task<Client?> GetByIdAsync(int clientId);

    Task<Client> AddAsync(Client client);

    Task<Client?> UpdateAsync(Client client);

    Task<bool> DeleteAsync(int clientId);

    Task<bool> ExistsByEmailAsync(string email);
}