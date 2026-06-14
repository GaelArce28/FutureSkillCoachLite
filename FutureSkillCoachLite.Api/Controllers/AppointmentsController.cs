using FutureSkillCoachLite.Dto.Appointments;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace FutureSkillCoachLite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentFacade _appointmentFacade;

    public AppointmentsController(IAppointmentFacade appointmentFacade)
    {
        _appointmentFacade = appointmentFacade;
    }

    [HttpGet]
    public async Task<ActionResult<List<AppointmentResponseDto>>> GetAll()
    {
        var appointments = await _appointmentFacade.GetAllAsync();

        return Ok(appointments);
    }

    [HttpGet("{appointmentId:int}")]
    public async Task<ActionResult<AppointmentResponseDto>> GetById(int appointmentId)
    {
        var appointment = await _appointmentFacade.GetByIdAsync(appointmentId);

        if (appointment == null)
        {
            return NotFound(new { message = "Appointment not found." });
        }

        return Ok(appointment);
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentResponseDto>> Create(
        CreateAppointmentRequestDto request)
    {
        try
        {
            var createdAppointment = await _appointmentFacade.CreateAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { appointmentId = createdAppointment.AppointmentId },
                createdAppointment
            );
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{appointmentId:int}")]
    public async Task<ActionResult<AppointmentResponseDto>> Update(
        int appointmentId,
        CreateAppointmentRequestDto request)
    {
        try
        {
            var updatedAppointment = await _appointmentFacade.UpdateAsync(
                appointmentId,
                request
            );

            if (updatedAppointment == null)
            {
                return NotFound(new { message = "Appointment not found." });
            }

            return Ok(updatedAppointment);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{appointmentId:int}")]
    public async Task<ActionResult> Delete(int appointmentId)
    {
        var deleted = await _appointmentFacade.DeleteAsync(appointmentId);

        if (!deleted)
        {
            return NotFound(new { message = "Appointment not found." });
        }

        return NoContent();
    }
}