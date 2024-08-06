import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const PatientDetail = () => {
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
    status: '',
    inactiveReason: '' 
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Fetch patient details
        const { data: patientData } = await axios.get(`https://localhost:7141/api/patients/${id}`);
        console.log('Patient data:', patientData);

        // Fetch addresses and contacts
        const { data: addresses } = await axios.get(`https://localhost:7141/api/patients/${id}/addresses`);
        const { data: contactsData } = await axios.get(`https://localhost:7141/api/patients/${id}/contacts`);
        const contacts = contactsData.$values || [];

        // Extract addresses
        const primaryAddress = addresses.primaryAddress || '';
        const secondaryAddress = addresses.secondaryAddress || '';

        // Extract and format contacts
        const phoneContacts = contacts.filter(c => c.contactType === 'Phone').map(c => c.contactDetail);
        const emailContacts = contacts.filter(c => c.contactType === 'Email').map(c => c.contactDetail);
        const formattedDateOfBirth = patientData.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString('en-GB') : '';

        setPatient({
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          gender: patientData.gender,
          dateOfBirth: formattedDateOfBirth,
          primaryAddress,
          secondaryAddress,
          phoneContacts,
          emailContacts,
          status: patientData.isActive,
          inactiveReason: patientData.inactiveReason || ''
        });
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-patient/${id}`);
  };

  return (
    <div className="container">
      <h2>Patient Detail</h2>
      <Paper style={{ padding: '16px' }}>
        <Typography variant="h6">Demographics</Typography>
        <Typography><strong>First Name:</strong> {patient.firstName}</Typography>
        <Typography><strong>Last Name:</strong> {patient.lastName}</Typography>
        <Typography><strong>Gender:</strong> {patient.gender}</Typography>
        <Typography><strong>Date of Birth:</strong> {patient.dateOfBirth}</Typography>
        <Typography><strong>Status:</strong> {patient.status}</Typography>
        {patient.status === 'Inactive' && (
          <Typography><strong>Reason for Inactivation:</strong> {patient.inactiveReason}</Typography>
        )}
        <Typography variant="h6">Addresses</Typography>
        <Typography><strong>Primary Address:</strong> {patient.primaryAddress}</Typography>
        <Typography><strong>Secondary Address:</strong> {patient.secondaryAddress}</Typography>
        <Typography variant="h6">Contacts</Typography>
        {patient.phoneContacts.map((contact, index) => (
          <Typography key={index}>
            <strong>Phone {index + 1}:</strong> {contact}
          </Typography>
        ))}
        {patient.emailContacts.map((contact, index) => (
          <Typography key={index}>
            <strong>Email {index + 1}:</strong> {contact}
          </Typography>
        ))}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Patient
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default PatientDetail;
