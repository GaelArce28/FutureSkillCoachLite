using Microsoft.AspNetCore.Mvc;
using FutureSkillCoachLite.DTO;
using FutureSkillCoachLite.Facade;

namespace FutureSkillCoachLite.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentFacade _facade;

        public AppointmentController(AppointmentFacade facade)
        {
            _facade = facade;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(CreateAppointmentDTO dto)
        {
            var result = await _facade.CreateAppointment(dto);

            return Ok(result);
        }
    }
}