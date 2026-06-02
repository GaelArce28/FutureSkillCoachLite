using FutureSkillCoachLite.Domain;

namespace FutureSkillCoachLite.Infrastructure
{
    public class AppointmentRepository
    {
        private readonly AppDbContext _context;

        public AppointmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Appointment> CreateAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);

            await _context.SaveChangesAsync();

            return appointment;
        }
    }
}