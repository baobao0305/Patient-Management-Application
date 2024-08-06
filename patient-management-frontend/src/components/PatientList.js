import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, Box, IconButton, Tooltip, Button, Snackbar, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://localhost:7141/api/patients');
        const data = response.data;
        if (data && Array.isArray(data.$values)) {
          setPatients(data.$values);
          setFilteredPatients(data.$values);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching patients.');
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filterPatients = () => {
      const lowercasedSearch = search.toLowerCase();

      const filtered = patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const matchesName = fullName.includes(lowercasedSearch);
        const matchesDOB = patient.dateOfBirth?.includes(lowercasedSearch);
        const matchesContact = patient.contactInfo && patient.contactInfo.some(contact => contact.contactDetail.toLowerCase().includes(lowercasedSearch));
        const matchesStatus = patient.isActive.toLowerCase().includes(lowercasedSearch);

        return (
          matchesName ||
          matchesDOB ||
          matchesContact ||
          matchesStatus
        );
      });

      setFilteredPatients(filtered);
    };

    filterPatients();
  }, [search, patients]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (patientID) => {
    navigate(`/patient-detail/${patientID}`);
  };

  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container">
      <h2>Patient List</h2>
      <Paper>
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              variant="outlined"
              label="Search (Name, Date of Birth, or Status)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddPatient}
            >
              Add Patient
            </Button>
          </Box>
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
              <Alert onClose={() => setError(null)} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                <TableRow key={patient.patientID}>
                  <TableCell>{patient.firstName}</TableCell>
                  <TableCell>{patient.lastName}</TableCell>
                  <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
                  <TableCell>{patient.isActive}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton color="primary" onClick={() => handleViewDetails(patient.patientID)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredPatients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default PatientList;
