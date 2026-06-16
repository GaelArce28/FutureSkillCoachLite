using FutureSkillCoachLite.Dto.Clients;

namespace FutureSkillCoachLite.Facade.Interfaces;

public interface IClientFacade
{
    Task<List<ClientResponseDto>> GetAllAsync();

    Task<ClientResponseDto?> GetByIdAsync(int clientId);

    Task<ClientResponseDto> CreateAsync(CreateClientRequestDto request);

   Task<ClientResponseDto?> UpdateAsync(int clientId, UpdateClientRequestDto request);

    Task<bool> DeleteAsync(int clientId);
}