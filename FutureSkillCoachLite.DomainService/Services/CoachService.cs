            using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;

namespace FutureSkillCoachLite.DomainService.Services;

public class CoachService : ICoachService
{
    private readonly ICoachRepository _coachRepository;

    public CoachService(ICoachRepository coachRepository)
    {
        _coachRepository = coachRepository;
    }

    public async Task<List<Coach>> GetAllAsync()
    {
        return await _coachRepository.GetAllAsync();
    }

    public async Task<Coach?> GetByIdAsync(int coachId)
    {
        return await _coachRepository.GetByIdAsync(coachId);
    }

    public async Task<Coach> CreateAsync(Coach coach)
    {
        var emailExists = await _coachRepository.ExistsByEmailAsync(coach.Email);

        if (emailExists)
        {
            throw new InvalidOperationException("A coach with this email already exists.");
        }

        return await _coachRepository.AddAsync(coach);
    }

    public async Task<Coach?> UpdateAsync(Coach coach)
    {
        return await _coachRepository.UpdateAsync(coach);
    }

    public async Task<bool> DeleteAsync(int coachId)
    {
        return await _coachRepository.DeleteAsync(coachId);
    }
}