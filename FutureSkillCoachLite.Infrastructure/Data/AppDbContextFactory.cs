using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

            namespace FutureSkillCoachLite.Infrastructure.Data;

            public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
            {
                public AppDbContext CreateDbContext(string[] args)
                {
                    var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

                    optionsBuilder.UseSqlServer(
                        "Server=localhost,1433;Database=FutureSkillCoachDb;User Id=sa;Password=YourStrongPass123!;TrustServerCertificate=True;"
                    );

                    return new AppDbContext(optionsBuilder.Options);
                }
            }