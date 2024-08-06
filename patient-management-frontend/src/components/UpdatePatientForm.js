import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, MenuItem, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdatePatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    primaryAddress: '',
    secondaryAddress: '',
    phoneContacts: [],
    emailContacts: [],
    isActive:'', // default value
    inactiveReason: '' 
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Fetch patient information
        const patientResponse = await axios.get(`https://localhost:7141/api/patients/${id}`);
        const patientData = patientResponse.data;

        // Fetch addresses
        const addressesResponse = await axios.get(`https://localhost:7141/api/patients/${id}/addresses`);
        const addresses = addressesResponse.data;

        // Fetch contacts
        const contactsResponse = await axios.get(`https://localhost:7141/api/patients/${id}/contacts`);
        const contactsData = contactsResponse.data.$values || [];

        // Extract address details
        const primaryAddress = addresses.primaryAddress || '';
        const secondaryAddress = addresses.secondaryAddress || '';

        // Separate phone and email contacts
        const phoneContacts = contactsData.filter(c => c.contactType === 'Phone').map(c => c.contactDetail);
        const emailContacts = contactsData.filter(c => c.contactType === 'Email').map(c => c.contactDetail);

        // Format date of birth
        const date = new Date(patientData.dateOfBirth);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        const formattedDateOfBirth = date.toISOString().split('T')[0];
        
        setPatient({
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          gender: patientData.gender,
          dateOfBirth: formattedDateOfBirth,
          primaryAddress,
          secondaryAddress,
          phoneContacts,
          emailContacts,
          isActive: patientData.isActive,
          inactiveReason: patientData.inactiveReason || ''
        });
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleChangeContact = (index, type, e) => {
    const updatedContacts = [...patient[type]];
    updatedContacts[index] = e.target.value;
    setPatient({ ...patient, [type]: updatedContacts });
  };
  
  const handleAddContact = (type) => {
    setPatient({ ...patient, [type]: [...patient[type], ''] });
  };

  const handleRemoveContact = (index, type) => {
    const updatedContacts = patient[type].filter((_, i) => i !== index);
    setPatient({ ...patient, [type]: updatedContacts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường không được để trống
    if (!patient.primaryAddress.trim()) {
      alert('Primary address cannot be empty.');
      return;
    }
  
    if (patient.phoneContacts.length === 0) {
      alert('At least one phone contact is required.');
      return;
    }
  
    if (patient.emailContacts.length === 0) {
      alert('At least one email contact is required.');
      return;
    }
    
    if (patient.isActive === 'Inactive' && !patient.inactiveReason) {
      alert('Please provide a reason for inactivation.');
      return;
    }

    try {
      const dataToSubmit = {
        PatientID: id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        gender: patient.gender,
        dateOfBirth: patient.dateOfBirth,
        isActive: patient.isActive, // Chuyển đổi thành boolean
        inactiveReason: patient.isActive === 'Active' ? null : patient.inactiveReason,
        ContactInfo: [
          ...patient.phoneContacts.map(contact => ({ ContactType: 'Phone', ContactDetail: contact, PatientID: id })),
          ...patient.emailContacts.map(contact => ({ ContactType: 'Email', ContactDetail: contact, PatientID: id }))
        ],
        Addresses: [
          { AddressType: 'Primary', AddressDetail: patient.primaryAddress, PatientID: id },
          { AddressType: 'Secondary', AddressDetail: patient.secondaryAddress, PatientID: id }
        ]
      };
      console.log('Data to be submitted:', dataToSubmit);
      await axios.put(`https://localhost:7141/api/patients/${id}`, dataToSubmit);
      alert('Patient updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div className="container">
      <h2>Update Patient</h2>
      <Paper style={{ padding: '16px' }}>
        <h3>Demographics</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.firstName}
            onChange={handleChange}
            required
            error={!patient.firstName.trim()}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.lastName}
            onChange={handleChange}
            required
            error={!patient.lastName.trim()}
          />
          <TextField
            label="Gender"
            name="gender"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.gender}
            onChange={handleChange}
            required
            select
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            variant="outlined"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={patient.dateOfBirth}
            onChange={handleChange}
            required
          />
          <TextField
            label="Status"
            name="isActive"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.isActive}
            onChange={handleChange}
            required
            select
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          {patient.isActive === 'Inactive' && (
            <TextField
              label="Reason for Inactivation"
              name="inactiveReason"
              variant="outlined"
              fullWidth
              margin="normal"
              value={patient.inactiveReason}
              onChange={handleChange}
              required
              error={!patient.inactiveReason.trim()}
            />
          )}
          <h3>Addresses</h3>
          <TextField
            label="Primary Address"
            name="primaryAddress"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.primaryAddress}
            onChange={handleChange}
            required
            error={!patient.primaryAddress.trim()}
          />
          <TextField
            label="Secondary Address"
            name="secondaryAddress"
            variant="outlined"
            fullWidth
            margin="normal"
            value={patient.secondaryAddress}
            onChange={handleChange}
          />
          <h3>Contacts</h3>
          {patient.phoneContacts.map((contact, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={`Phone Contact ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={contact}
                onChange={(e) => handleChangeContact(index, 'phoneContacts', e)}
                required
                error={!contact.trim()}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveContact(index, 'phoneContacts')}
                style={{ marginLeft: '8px' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={() => handleAddContact('phoneContacts')}>
            Add Phone Contact
          </Button>
          {patient.emailContacts.map((contact, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={`Email Contact ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={contact}
                onChange={(e) => handleChangeContact(index, 'emailContacts', e)}
                required
                error={!contact.trim()}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveContact(index, 'emailContacts')}
                style={{ marginLeft: '8px' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={() => handleAddContact('emailContacts')}>
            Add Email Contact
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px', display: 'block'  }}>
            Update Patient
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default UpdatePatientForm;
