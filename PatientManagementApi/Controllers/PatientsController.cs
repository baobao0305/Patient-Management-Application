using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientManagementApi.Models;  
using PatientManagementApi.Data;   

namespace PatientManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        // GET: api/patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patients
                .Include(p => p.ContactInfo)  // Bao gồm ContactInfo
                .Include(p => p.Addresses)
                .FirstOrDefaultAsync(p => p.PatientID == id);

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        // POST: api/patients
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            if (patient == null)
            {
                return BadRequest("Patient data is null.");
            }

            

            // Add patient
            _context.Patients.Add(patient);

            // Update ContactInfo with the PatientID
            foreach (var contact in patient.ContactInfo)
            {
                contact.PatientID = patient.PatientID;
                _context.ContactInfo.Add(contact); // Set PatientID for the contact info
            }
            foreach (var address in patient.Addresses)
            {
                address.PatientID = patient.PatientID;
                _context.Addresses.Add(address);
            }
            await _context.SaveChangesAsync();  

            return CreatedAtAction(nameof(GetPatient), new { id = patient.PatientID }, patient);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] Patient patient)
        {
            if (id != patient.PatientID)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPatient = await _context.Patients
                .Include(p => p.ContactInfo)
                .Include(p => p.Addresses)
                .FirstOrDefaultAsync(p => p.PatientID == id);

            if (existingPatient == null)
            {
                return NotFound();
            }

            // Update basic patient info
            existingPatient.FirstName = patient.FirstName;
            existingPatient.LastName = patient.LastName;
            existingPatient.Gender = patient.Gender;
            existingPatient.DateOfBirth = patient.DateOfBirth;

            // Update status and inactive reason
            existingPatient.IsActive = patient.IsActive;
            if (patient.IsActive == "Active")
            {
                existingPatient.InactiveReason = null; // Reset InactiveReason if patient is active
            }
            else if (patient.IsActive == "Inactive")
            {
                existingPatient.InactiveReason = patient.InactiveReason;
            }

            // Update contact info
            var existingContacts = existingPatient.ContactInfo.ToList();
            var newContacts = patient.ContactInfo.ToList();

            // Remove contacts that are no longer in the new list
            var contactsToRemove = existingContacts
                .Where(existingContact => !newContacts.Any(newContact => newContact.ContactID == existingContact.ContactID))
                .ToList();

            _context.ContactInfo.RemoveRange(contactsToRemove);

            // Update existing contacts and add new ones
            foreach (var newContact in newContacts)
            {
                var existingContact = existingContacts.FirstOrDefault(c => c.ContactID == newContact.ContactID);
                if (existingContact != null)
                {
                    existingContact.ContactType = newContact.ContactType;
                    existingContact.ContactDetail = newContact.ContactDetail;
                }
                else
                {
                    // Ensure that new contacts are added without changing IDs
                    newContact.PatientID = id;
                    _context.ContactInfo.Add(newContact);
                }
            }

            // Update addresses
            var existingAddresses = existingPatient.Addresses.ToList();
            var newAddresses = patient.Addresses.ToList();

            // Remove addresses that are no longer in the new list
            var addressesToRemove = existingAddresses
                .Where(existingAddress => !newAddresses.Any(newAddress => newAddress.AddressID == existingAddress.AddressID))
                .ToList();

            _context.Addresses.RemoveRange(addressesToRemove);

            // Update existing addresses and add new ones
            foreach (var newAddress in newAddresses)
            {
                var existingAddress = existingAddresses.FirstOrDefault(a => a.AddressID == newAddress.AddressID);
                if (existingAddress != null)
                {
                    existingAddress.AddressType = newAddress.AddressType;
                    existingAddress.AddressDetail = newAddress.AddressDetail;
                }
                else
                {
                    // Ensure that new addresses are added without changing IDs
                    newAddress.PatientID = id;
                    _context.Addresses.Add(newAddress);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("{id}/addresses")]
        public async Task<IActionResult> GetAddresses(int id)
        {
            var patient = await _context.Patients
                .Include(p => p.Addresses)
                .FirstOrDefaultAsync(p => p.PatientID == id);

            if (patient == null)
            {
                return NotFound();
            }

            var addresses = new
            {
                PrimaryAddress = patient.Addresses.FirstOrDefault(a => a.AddressType == "Primary")?.AddressDetail,
                SecondaryAddress = patient.Addresses.FirstOrDefault(a => a.AddressType == "Secondary")?.AddressDetail
            };

            return Ok(addresses);
        }

        [HttpPut("{id}/addresses")]
        public async Task<IActionResult> UpdateAddresses(int id, [FromBody] List<Addresses> addresses)
        {
            var existingAddresses = await _context.Addresses
                .Where(a => a.PatientID == id)
                .ToListAsync();

            if (existingAddresses == null)
            {
                return NotFound();
            }

            _context.Addresses.RemoveRange(existingAddresses);
            await _context.SaveChangesAsync();

            foreach (var address in addresses)
            {
                address.PatientID = id;
                _context.Addresses.Add(address);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/contacts")]
        public async Task<IActionResult> GetContacts(int id)
        {
            var contacts = await _context.ContactInfo
                .Where(c => c.PatientID == id)
                .ToListAsync();

            if (contacts == null)
            {
                return NotFound();
            }

            return Ok(contacts);
        }

        [HttpPut("{id}/contacts")]
        public async Task<IActionResult> UpdateContacts(int id, [FromBody] List<ContactInfo> contacts)
        {
            // Xóa tất cả liên hệ hiện tại
            var existingContacts = await _context.ContactInfo
                .Where(c => c.PatientID == id)
                .ToListAsync();

            if (existingContacts == null)
            {
                return NotFound();
            }

            _context.ContactInfo.RemoveRange(existingContacts);
            await _context.SaveChangesAsync();

            // Thêm các liên hệ mới
            foreach (var contact in contacts)
            {
                contact.PatientID = id;
                _context.ContactInfo.Add(contact);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.PatientID == id);
        }
    }
}
