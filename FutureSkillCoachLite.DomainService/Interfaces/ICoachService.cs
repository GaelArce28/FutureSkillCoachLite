using System;
    using FutureSkillCoachLite.Domain.Entities;

        namespace FutureSkillCoachLite.DomainService.Interfaces;

        public interface ICoachService
        {
            Task<List<Coach>> GetAllAsync();

            Task<Coach?> GetByIdAsync(int coachId);

            Task<Coach> CreateAsync(Coach coach);

            Task<Coach?> UpdateAsync(Coach coach);

            Task<bool> DeleteAsync(int coachId);
        }