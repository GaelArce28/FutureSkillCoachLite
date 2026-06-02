using FutureSkillCoachLite.Dto.Clients;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FutureSkillCoachLite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly IClientFacade _clientFacade;

    public ClientsController(IClientFacade clientFacade)
    {
        _clientFacade = clientFacade;
    }

    [HttpGet]
    public async Task<ActionResult<List<ClientResponseDto>>> GetAll()
    {
        var clients = await _clientFacade.GetAllAsync();

        return Ok(clients);
    }

    [HttpGet("{clientId:int}")]
    public async Task<ActionResult<ClientResponseDto>> GetById(int clientId)
    {
        var client = await _clientFacade.GetByIdAsync(clientId);

        if (client == null)
        {
            return NotFound(new { message = "Client not found." });
        }

        return Ok(client);
    }

    [HttpPost]
    public async Task<ActionResult<ClientResponseDto>> Create(CreateClientRequestDto request)
    {
        try
        {
            var createdClient = await _clientFacade.CreateAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { clientId = createdClient.ClientId },
                createdClient
            );
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{clientId:int}")]
    public async Task<ActionResult<ClientResponseDto>> Update(
        int clientId,
        CreateClientRequestDto request)
    {
        var updatedClient = await _clientFacade.UpdateAsync(clientId, request);

        if (updatedClient == null)
        {
            return NotFound(new { message = "Client not found." });
        }

        return Ok(updatedClient);
    }

    [HttpDelete("{clientId:int}")]
    public async Task<ActionResult> Delete(int clientId)
    {
        var deleted = await _clientFacade.DeleteAsync(clientId);

        if (!deleted)
        {
            return NotFound(new { message = "Client not found." });
        }

        return NoContent();
    }
}