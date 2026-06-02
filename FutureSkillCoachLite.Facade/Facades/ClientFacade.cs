using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Dto.Clients;
using FutureSkillCoachLite.Facade.Interfaces;

namespace FutureSkillCoachLite.Facade.Facades;

public class ClientFacade : IClientFacade
{
    private readonly IClientService _clientService;

    public ClientFacade(IClientService clientService)
    {
        _clientService = clientService;
    }

    public async Task<List<ClientResponseDto>> GetAllAsync()
    {
        var clients = await _clientService.GetAllAsync();

        return clients.Select(client => new ClientResponseDto
        {
            ClientId = client.ClientId,
            FullName = client.FullName,
            Email = client.Email,
            Goal = client.Goal,
            CoachId = client.CoachId,
            CoachName = client.Coach?.FullName ?? string.Empty
        }).ToList();
    }

    public async Task<ClientResponseDto?> GetByIdAsync(int clientId)
    {
        var client = await _clientService.GetByIdAsync(clientId);

        if (client == null)
        {
            return null;
        }

        return new ClientResponseDto
        {
            ClientId = client.ClientId,
            FullName = client.FullName,
            Email = client.Email,
            Goal = client.Goal,
            CoachId = client.CoachId,
            CoachName = client.Coach?.FullName ?? string.Empty
        };
    }

    public async Task<ClientResponseDto> CreateAsync(CreateClientRequestDto request)
    {
        var client = new Client
        {
            FullName = request.FullName,
            Email = request.Email,
            Goal = request.Goal,
            CoachId = request.CoachId
        };

        var createdClient = await _clientService.CreateAsync(client);

        return new ClientResponseDto
        {
            ClientId = createdClient.ClientId,
            FullName = createdClient.FullName,
            Email = createdClient.Email,
            Goal = createdClient.Goal,
            CoachId = createdClient.CoachId,
            CoachName = createdClient.Coach?.FullName ?? string.Empty
        };
    }

    public async Task<ClientResponseDto?> UpdateAsync(int clientId, CreateClientRequestDto request)
    {
        var client = new Client
        {
            ClientId = clientId,
            FullName = request.FullName,
            Email = request.Email,
            Goal = request.Goal,
            CoachId = request.CoachId
        };

        var updatedClient = await _clientService.UpdateAsync(client);

        if (updatedClient == null)
        {
            return null;
        }

        return new ClientResponseDto
        {
            ClientId = updatedClient.ClientId,
            FullName = updatedClient.FullName,
            Email = updatedClient.Email,
            Goal = updatedClient.Goal,
            CoachId = updatedClient.CoachId,
            CoachName = updatedClient.Coach?.FullName ?? string.Empty
        };
    }

    public async Task<bool> DeleteAsync(int clientId)
    {
        return await _clientService.DeleteAsync(clientId);
    }
}