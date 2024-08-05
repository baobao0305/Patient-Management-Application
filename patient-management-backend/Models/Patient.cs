using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PatientManagementApi.Models
{
    public class Patient
    {
        [Key]
        public int PatientID { get; set; }

        
        public string? FirstName { get; set; }

        
        public string? LastName { get; set; }

        
        public string? Gender { get; set; }

        public string? IsActive { get; set; }
        public string? InactiveReason { get; set; }
        public DateTime? DateOfBirth { get; set; }    
        public ICollection<ContactInfo> ContactInfo { get; set; }
        public ICollection<Addresses> Addresses { get; set; }
        
    }

    public class ContactInfo
    {
        [Key]
        public int ContactID { get; set; }
        
        public string? ContactType { get; set; }
        
        public string? ContactDetail { get; set; }
        
        public int PatientID { get; set; }
        public Patient? Patient { get; set; }
    }

        public class Addresses
    {
        [Key]
        public int AddressID { get; set; }
        
        public string? AddressType { get; set; }
        
        public string? AddressDetail { get; set; }
        
        public int PatientID { get; set; }
        public Patient? Patient { get; set; }
    }


}
