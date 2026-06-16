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
                        "Server=tcp:futureskill-gael-2026.database.windows.net,1433;Initial Catalog=FutureSkillCoachLiteDB;Persist Security Info=False;User ID=adminsql;Password=PLACEHOLDER;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
                    );

                    return new AppDbContext(optionsBuilder.Options);
                }
            }