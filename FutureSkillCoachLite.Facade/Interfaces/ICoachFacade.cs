using System;
            using FutureSkillCoachLite.Dto.Coaches;

        namespace FutureSkillCoachLite.Facade.Interfaces;

        public interface ICoachFacade
        {
            Task<List<CoachResponseDto>> GetAllAsync();

            Task<CoachResponseDto?> GetByIdAsync(int coachId);

            Task<CoachResponseDto> CreateAsync(CreateCoachRequestDto request);

            Task<CoachResponseDto?> UpdateAsync(int coachId, UpdateCoachRequestDto request);

            Task<bool> DeleteAsync(int coachId);
        }
