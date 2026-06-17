using FutureSkillCoachLite.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.DomainService.Services;
using FutureSkillCoachLite.Facade.Facades;
using FutureSkillCoachLite.Facade.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using FutureSkillCoachLite.Infrastructure.Repositories;
using System.Text;
using FutureSkillCoachLite.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Esto sirve para agregar los controladores de la API.
builder.Services.AddControllers();

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key no está configurado.");

var jwtIssuer = builder.Configuration["Jwt:Issuer"]
    ?? throw new InvalidOperationException("Jwt:Issuer no está configurado.");

var jwtAudience = builder.Configuration["Jwt:Audience"]
    ?? throw new InvalidOperationException("Jwt:Audience no está configurado.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,

        ValidateAudience = true,
        ValidAudience = jwtAudience,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
        ),

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

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
builder.Services.AddScoped<JwtService>();

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

app.UseAuthentication();
app.UseAuthorization();
// activa las rutas de los controladores para que puedan recibir peticiones HTTP
app.MapControllers();

app.Run();