using FutureSkillCoachLite.Domain.Entities;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.Dto.Coaches;
using FutureSkillCoachLite.Facade.Interfaces;

namespace FutureSkillCoachLite.Facade.Facades;

         //ESTA CLASE ACTUA COMO UN PUENTE ENTRE LOS CONTROLADORES Y LOS SERVICIOS DE DOMINIO
    // RECIBE LAS SOLICITUDES Y DEVUELVE LOS DTO DE RESPUESTA AL FRONTEND.
public class CoachFacade : ICoachFacade
{
    private readonly ICoachService _coachService;

    public CoachFacade(ICoachService coachService)
    {
        _coachService = coachService;
    }

    public async Task<List<CoachResponseDto>> GetAllAsync()
    {
        var coaches = await _coachService.GetAllAsync();

        return coaches.Select(coach => new CoachResponseDto
        {
            CoachId = coach.CoachId,
            FullName = coach.FullName,
            Specialty = coach.Specialty,
            Email = coach.Email
        }).ToList();
    }

    public async Task<CoachResponseDto?> GetByIdAsync(int coachId)
    {
        var coach = await _coachService.GetByIdAsync(coachId);

        if (coach == null)
        {
            return null;
        }

        return new CoachResponseDto
        {
            CoachId = coach.CoachId,
            FullName = coach.FullName,
            Specialty = coach.Specialty,
            Email = coach.Email
        };
    }

    public async Task<CoachResponseDto> CreateAsync(CreateCoachRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Password))
        {
            throw new InvalidOperationException("La contraseña es obligatoria.");
        }

        var coach = new Coach
        {
            FullName = request.FullName,
            Specialty = request.Specialty,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        var createdCoach = await _coachService.CreateAsync(coach);

        return new CoachResponseDto
        {
            CoachId = createdCoach.CoachId,
            FullName = createdCoach.FullName,
            Specialty = createdCoach.Specialty,
            Email = createdCoach.Email
        };
    }

    public async Task<CoachResponseDto?> UpdateAsync(int coachId, UpdateCoachRequestDto request)
    {
        var currentCoach = await _coachService.GetByIdAsync(coachId);

        if (currentCoach == null)
        {
            return null;
        }

        var coach = new Coach
        {
            CoachId = coachId,
            FullName = request.FullName,
            Specialty = request.Specialty,
            Email = request.Email,
            PasswordHash = string.IsNullOrWhiteSpace(request.Password)
                ? currentCoach.PasswordHash
                : BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        var updatedCoach = await _coachService.UpdateAsync(coach);

        if (updatedCoach == null)
        {
            return null;
        }

        return new CoachResponseDto
        {
            CoachId = updatedCoach.CoachId,
            FullName = updatedCoach.FullName,
            Specialty = updatedCoach.Specialty,
            Email = updatedCoach.Email
        };
    }

    public async Task<bool> DeleteAsync(int coachId)
    {
        return await _coachService.DeleteAsync(coachId);
    }
}