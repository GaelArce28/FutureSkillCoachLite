        using FutureSkillCoachLite.Domain.Entities;

        namespace FutureSkillCoachLite.Infrastructure.Interfaces;

        public interface ICoachRepository
        {
            Task<List<Coach>> GetAllAsync();

            Task<Coach?> GetByIdAsync(int coachId);

            Task<Coach> AddAsync(Coach coach);

            Task<Coach?> UpdateAsync(Coach coach);

            Task<bool> DeleteAsync(int coachId);

            Task<bool> ExistsByEmailAsync(string email);
        }
