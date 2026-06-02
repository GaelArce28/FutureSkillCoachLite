using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;

namespace FutureSkillCoachLite.DomainService.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientRepository;

    public ClientService(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<List<Client>> GetAllAsync()
    {
        return await _clientRepository.GetAllAsync();
    }

    public async Task<Client?> GetByIdAsync(int clientId)
    {
        return await _clientRepository.GetByIdAsync(clientId);
    }

    public async Task<Client> CreateAsync(Client client)
    {
        var emailExists = await _clientRepository.ExistsByEmailAsync(client.Email);

        if (emailExists)
        {
            throw new InvalidOperationException("A client with this email already exists.");
        }

        return await _clientRepository.AddAsync(client);
    }

    public async Task<Client?> UpdateAsync(Client client)
    {
        return await _clientRepository.UpdateAsync(client);
    }

    public async Task<bool> DeleteAsync(int clientId)
    {
        return await _clientRepository.DeleteAsync(clientId);
    }
}