using System;
using FutureSkillCoachLite.Dto.Coaches;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;
        // ESTA CLASE GESTIONA LAS PETICIONES HTTPS DE LOS COACHES GET, POST, PUT Y DELETE, 
        // LLAMANDO A LOS MÉTODOS CORRESPONDIENTES EN EL COACHFACADE
namespace FutureSkillCoachLite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoachesController : ControllerBase
{
    private readonly ICoachFacade _coachFacade;

    public CoachesController(ICoachFacade coachFacade)
    {
        _coachFacade = coachFacade;
    }

    [HttpGet]
    public async Task<ActionResult<List<CoachResponseDto>>> GetAll()
    {
        var coaches = await _coachFacade.GetAllAsync();

        return Ok(coaches);
    }

    [HttpGet("{coachId:int}")]
    public async Task<ActionResult<CoachResponseDto>> GetById(int coachId)
    {
        var coach = await _coachFacade.GetByIdAsync(coachId);

        if (coach == null)
        {
            return NotFound(new { message = "Coach not found." });
        }

        return Ok(coach);
    }

    [HttpPost]
    public async Task<ActionResult<CoachResponseDto>> Create(CreateCoachRequestDto request)
    {
        try
        {
            var createdCoach = await _coachFacade.CreateAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { coachId = createdCoach.CoachId },
                createdCoach
            );
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{coachId:int}")]
    public async Task<ActionResult<CoachResponseDto>> Update(
        int coachId,
        UpdateCoachRequestDto request)
    {
        var updatedCoach = await _coachFacade.UpdateAsync(coachId, request);

        if (updatedCoach == null)
        {
            return NotFound(new { message = "Coach not found." });
        }

        return Ok(updatedCoach);
    }

    [HttpDelete("{coachId:int}")]
    public async Task<ActionResult> Delete(int coachId)
    {
        var deleted = await _coachFacade.DeleteAsync(coachId);

        if (!deleted)
        {
            return NotFound(new { message = "Coach not found." });
        }

        return NoContent();
    }
}
