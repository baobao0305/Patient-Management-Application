using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PatientManagementApi.Models
{
    public class Patient
    {
        [Key]
        public int PatientID { get; set; }

        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(10)]
        public string Gender { get; set; }

        [MaxLength(10)]
        public string IsActive { get; set; }
        
        [MaxLength(200)]
        public string InactiveReason { get; set; }

        public DateTime? DateOfBirth { get; set; }
        
        public ICollection<ContactInfo> ContactInfo { get; set; } = new HashSet<ContactInfo>();
        public ICollection<Addresses> Addresses { get; set; } = new HashSet<Addresses>();
    }

    public class ContactInfo
    {
        [Key]
        public int ContactID { get; set; }

        [MaxLength(50)]
        public string ContactType { get; set; }

        [MaxLength(100)]
        public string ContactDetail { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }
    }

    public class Addresses
    {
        [Key]
        public int AddressID { get; set; }

        [MaxLength(50)]
        public string AddressType { get; set; }

        [MaxLength(200)]
        public string AddressDetail { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }
    }
}
