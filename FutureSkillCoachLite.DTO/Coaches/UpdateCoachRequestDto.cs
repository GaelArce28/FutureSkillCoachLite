using System;
    namespace FutureSkillCoachLite.Dto.Coaches;

    public class UpdateCoachRequestDto
    {
        public string FullName { get; set; } = string.Empty;

        public string Specialty { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
