using System;
namespace FutureSkillCoachLite.Dto.Coaches;

        public class CoachResponseDto
        {
            public int CoachId { get; set; }

            public string FullName { get; set; } = string.Empty;

            public string Specialty { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;
        }