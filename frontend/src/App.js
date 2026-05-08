import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import MedicalRecord from './pages/MedicalRecord';
import Sidebar from './components/Sidebar';
import './styles/global.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="agendamentos" element={<Appointments />} />
          <Route path="prontuario/:pacienteId" element={<MedicalRecord />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="agendamentos" element={<Appointments />} />
          <Route path="prontuario/:pacienteId" element={<MedicalRecord />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
