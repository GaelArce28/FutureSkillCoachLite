using FutureSkillCoachLite.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FutureSkillCoachLite.DomainService.Interfaces;
using FutureSkillCoachLite.DomainService.Services;
using FutureSkillCoachLite.Facade.Facades;
using FutureSkillCoachLite.Facade.Interfaces;
using FutureSkillCoachLite.Infrastructure.Interfaces;
using FutureSkillCoachLite.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICoachRepository, CoachRepository>();
builder.Services.AddScoped<ICoachService, CoachService>();
builder.Services.AddScoped<ICoachFacade, CoachFacade>();

builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientFacade, ClientFacade>();

builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IAppointmentFacade, AppointmentFacade>();

builder.Services.AddScoped<IAuthFacade, AuthFacade>();

// OpenAPI documentation.
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();