import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatientForm from './components/AddPatientForm';
import UpdatePatientForm from './components/UpdatePatientForm';
import PatientDetail from './components/PatientDetail';

const App = () => (
  <Router basename="/Novobi-Patient-Management-Application">
    <div className="App">
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/update-patient/:id" element={<UpdatePatientForm />} />
        <Route path="/patient-detail/:id" element={<PatientDetail />} />
      </Routes>
    </div>
  </Router>
);

export default App;
