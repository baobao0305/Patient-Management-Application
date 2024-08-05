import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem,  } from '@mui/material';

const AddPatientForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phones, setPhones] = useState(['']);
  const [emails, setEmails] = useState(['']);
  const [primaryAddress, setPrimaryAddress] = useState('');
  const [secondaryAddress, setSecondaryAddress] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      ContactInfo: [
        ...phones.map(phone => ({ ContactType: 'Phone', ContactDetail: phone})),
        ...emails.map(email => ({ ContactType: 'Email', ContactDetail: email})),
      ],
      Addresses: [
        { AddressType: 'Primary', AddressDetail: primaryAddress },
        { AddressType: 'Secondary', AddressDetail: secondaryAddress }
      ]
    };

    
    try {
      const response = await axios.post('https://localhost:7141/api/patients', patient);
      console.log(response.data);
      alert('Patient added successfully!');
      setFirstName('');
      setLastName('');
      setGender('');
      setDateOfBirth('');
      setPhones(['']);
      setEmails(['']);
      setPrimaryAddress('');
      setSecondaryAddress('');
    } catch (error) {
      if (error.response) {
        console.error('Error adding patient:', error.response.data);
        alert(`Error adding patient: ${error.response.data}`);
    } else if (error.request) {
        console.error('Error adding patient: No response received');
        alert('Error adding patient: No response received');
    } else {
        console.error('Error adding patient:', error.message);
        alert(`Error adding patient: ${error.message}`);
    }
    }
  };

  const handleAddPhone = () => {
    setPhones([...phones, '']);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleChangePhone = (index, e) => {
    const newPhones = phones.map((phone, i) => (i === index ? e.target.value : phone));
    setPhones(newPhones);
  };

  const handleChangeEmail = (index, e) => {
    const newEmails = emails.map((email, i) => (i === index ? e.target.value : email));
    setEmails(newEmails);
  };

  const handleRemovePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };


  return (
    <div className="container">
      <h2>Add New Patient</h2>
      <Paper style={{ padding: '16px' }}>
        <form onSubmit={handleSubmit}>
        <h3>Demographics</h3>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date of Birth"
            variant="outlined"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
                    <h3>Addresses</h3>
          <TextField
            label="Primary Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={primaryAddress}
            onChange={(e) => setPrimaryAddress(e.target.value)}
            required
          />
          <TextField
            label="Secondary Address (Optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={secondaryAddress}
            onChange={(e) => setSecondaryAddress(e.target.value)}
          />
          <h3>Contact Info</h3>
          {phones.map((phone, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => handleChangePhone(index, e)}
                required
              />
              {index > 0 && (
              <Button size="small" variant="contained" color="secondary" onClick={() => handleRemovePhone(index)} style={{ marginTop: '8px' }}>
                Remove Phone
              </Button>
              )}
            </div>
          ))}
          <Button size="small" variant="contained" color="primary" onClick={handleAddPhone}>
            Add Phone Number
          </Button>
          {emails.map((email, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => handleChangeEmail(index, e)}
                required
              />
              {index > 0 && (
              <Button size="small" variant="contained" color="secondary" onClick={() => handleRemoveEmail(index)} style={{ marginTop: '8px' }}>
                Remove Email
              </Button>
              )}
            </div>
          ))}
          <Button size="small" variant="contained" color="primary" onClick={handleAddEmail}>
            Add Email Address
          </Button>

          <Button size="large" type="submit" variant="contained" color="primary" style={{ marginTop: '8px',  display: 'block' }}>Add Patient</Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddPatientForm;
