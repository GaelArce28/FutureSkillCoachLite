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

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<ICoachRepository, CoachRepository>();
            builder.Services.AddScoped<ICoachService, CoachService>();
            builder.Services.AddScoped<ICoachFacade, CoachFacade>();

        // OpenAPI documentation.
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();