using FutureSkillCoachLite.Domain.Entities;

namespace FutureSkillCoachLite.DomainService.Interfaces;

public interface IClientService
{
     // metodos get 
    
    Task<List<Client>> GetAllAsync();

    Task<Client?> GetByIdAsync(int clientId);

    Task<Client?> GetByEmailAsync(string email);

    //metodos post, put, delete 
    Task<Client> CreateAsync(Client client);

    Task<Client?> UpdateAsync(Client client);

    Task<bool> DeleteAsync(int clientId);
}