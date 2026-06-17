using FutureSkillCoachLite.Dto.Clients;
using FutureSkillCoachLite.Facade.Interfaces;
using Microsoft.AspNetCore.Mvc;
             // ESTA CLASE GESTIONA LAS PETICIONES HTTPS DE LAS CLIENTES GET, POST, PUT Y DELETE, 
          // LLAMANDO A LOS MÉTODOS CORRESPONDIENTES EN EL CLIENTFACADE
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
        try
        {
            var clients = await _clientFacade.GetAllAsync();

            if (!clients.Any())
            {
                return NotFound(new
                {
                    message = "No clients registered."
                });
            }

            return Ok(clients);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "An internal server error occurred.",
                error = ex.Message
            });
        }
    }

    [HttpGet("{clientId:int}")]
    public async Task<ActionResult<ClientResponseDto>> GetById(int clientId)
    {
        try
        {
            var client = await _clientFacade.GetByIdAsync(clientId);

            if (client == null)
            {
                return NotFound(new
                {
                    message = "Client not found."
                });
            }

            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "An internal server error occurred.",
                error = ex.Message
            });
        }
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
            return BadRequest(new
            {
                message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "An internal server error occurred.",
                error = ex.Message
            });
        }
    }

    [HttpPut("{clientId:int}")]
    public async Task<ActionResult<ClientResponseDto>> Update(
        int clientId,
        UpdateClientRequestDto request)
    {
        try
        {
            var updatedClient = await _clientFacade.UpdateAsync(clientId, request);

            if (updatedClient == null)
            {
                return NotFound(new
                {
                    message = "Client not found."
                });
            }

            return Ok(updatedClient);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "An internal server error occurred.",
                error = ex.Message
            });
        }
    }

    [HttpDelete("{clientId:int}")]
    public async Task<ActionResult> Delete(int clientId)
    {
        try
        {
            var deleted = await _clientFacade.DeleteAsync(clientId);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Client not found."
                });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "An internal server error occurred.",
                error = ex.Message
            });
        }
    }
}