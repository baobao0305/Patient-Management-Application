using Microsoft.EntityFrameworkCore;
using PatientManagementApi.Models;

namespace PatientManagementApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        
        public DbSet<ContactInfo> ContactInfo { get; set; }

        public DbSet<Addresses> Addresses { get; set; }
    }
}
