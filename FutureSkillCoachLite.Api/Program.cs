using FutureSkillCoachLite.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.DomainService.Services;
using FutureSkillCoachLite.Facade.Facades;
using FutureSkillCoachLite.Facade.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using FutureSkillCoachLite.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Esto sirve para agregar los controladores de la API.
builder.Services.AddControllers();

// Esto sirve para permitir que el frontend web y Android puedan consumir la API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Esto sirve para conectar la API con SQL Server.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Esto sirve para registrar las dependencias de Coaches.
builder.Services.AddScoped<ICoachRepository, CoachRepository>();
builder.Services.AddScoped<ICoachService, CoachService>();
builder.Services.AddScoped<ICoachFacade, CoachFacade>();

// Esto sirve para registrar las dependencias de Clients.
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientFacade, ClientFacade>();

// Esto sirve para registrar las dependencias de Appointments.
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IAppointmentFacade, AppointmentFacade>();

// Esto sirve para registrar la lógica de autenticación.
builder.Services.AddScoped<IAuthFacade, AuthFacade>();

// Esto sirve para habilitar documentación OpenAPI.
builder.Services.AddOpenApi();

var app = builder.Build();

// Esto sirve para habilitar OpenAPI en ambiente de desarrollo.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Esto se comenta para pruebas locales con Android usando HTTP.
// app.UseHttpsRedirection();

// Esto sirve para aplicar la política de CORS.
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();