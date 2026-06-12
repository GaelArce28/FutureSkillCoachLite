using FutureSkillCoachLite.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FutureSkillCoachLite.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Coach> Coaches { get; set; }

    public DbSet<Client> Clients { get; set; }

    public DbSet<Appointment> Appointments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Coach>(entity =>
        {
            entity.HasKey(c => c.CoachId);

            entity.Property(c => c.FullName)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Specialty)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.PasswordHash)
                .IsRequired()
                .HasMaxLength(255)
                .HasDefaultValue("$2a$11$8FI3dLWRnlGlkhHVxPgeTeyPvMJpqUMWPX1FsP.fNmFCYa6v7ri/y");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(c => c.ClientId);

            entity.Property(c => c.FullName)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Goal)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(c => c.PasswordHash)
                .IsRequired()
                .HasMaxLength(255)
                .HasDefaultValue("$2a$11$8FI3dLWRnlGlkhHVxPgeTeyPvMJpqUMWPX1FsP.fNmFCYa6v7ri/y");

            entity.HasOne(c => c.Coach)
                .WithMany()
                .HasForeignKey(c => c.CoachId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(a => a.AppointmentId);

            entity.Property(a => a.Topic)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(a => a.Status)
                .IsRequired()
                .HasMaxLength(50);

            entity.HasOne(a => a.Client)
                .WithMany()
                .HasForeignKey(a => a.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(a => a.Coach)
                .WithMany()
                .HasForeignKey(a => a.CoachId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}