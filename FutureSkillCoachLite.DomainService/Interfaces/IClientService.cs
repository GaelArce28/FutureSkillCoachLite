using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.DomainService.Interfaces;

public interface IClientService
{
    Task<List<Client>> GetAllAsync();

    Task<Client?> GetByIdAsync(int clientId);

    Task<Client?> GetByEmailAsync(string email);

    Task<Client> CreateAsync(Client client);

    Task<Client?> UpdateAsync(Client client);

    Task<bool> DeleteAsync(int clientId);
}