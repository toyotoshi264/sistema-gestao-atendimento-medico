import React, { useState } from 'react';
import '../styles/appointments.css';

function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [appointments] = useState([
    { id: 1, paciente: 'Maria Silva', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '08:30', status: 'confirmado' },
    { id: 2, paciente: 'João Santos', medico: 'Dra. Ana Oliveira', data: '2025-05-08', hora: '09:00', status: 'agendado' },
    { id: 3, paciente: 'Pedro Almeida', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '09:30', status: 'agendado' },
    { id: 4, paciente: 'Ana Costa', medico: 'Dra. Ana Oliveira', data: '2025-05-08', hora: '10:00', status: 'concluido' },
    { id: 5, paciente: 'Lucas Ferreira', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '10:30', status: 'cancelado' },
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      agendado: 'badge-scheduled',
      confirmado: 'badge-confirmed',
      em_atendimento: 'badge-progress',
      concluido: 'badge-done',
      cancelado: 'badge-cancelled'
    };
    const labels = {
      agendado: 'Agendado',
      confirmado: 'Confirmado',
      em_atendimento: 'Em Atendimento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return <span className={`badge ${badges[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h2>Agendamentos</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + Novo Agendamento
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Novo Agendamento</h3>
          <form className="appointment-form">
            <div className="form-row">
              <div className="form-group">
                <label>Paciente</label>
                <select>
                  <option value="">Selecione o paciente</option>
                  <option>Maria Silva</option>
                  <option>João Santos</option>
                  <option>Pedro Almeida</option>
                </select>
              </div>
              <div className="form-group">
                <label>Médico</label>
                <select>
                  <option value="">Selecione o médico</option>
                  <option>Dr. Carlos Mendes - Clínico Geral</option>
                  <option>Dra. Ana Oliveira - Cardiologia</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Horário</label>
                <select>
                  <option value="">Selecione</option>
                  <option>08:00</option>
                  <option>08:30</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>10:30</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>14:30</option>
                  <option>15:00</option>
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea placeholder="Observações sobre o agendamento"></textarea>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-primary">Agendar</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(apt => (
            <tr key={apt.id}>
              <td>{new Date(apt.data + 'T12:00:00').toLocaleDateString('pt-BR')}</td>
              <td>{apt.hora}</td>
              <td>{apt.paciente}</td>
              <td>{apt.medico}</td>
              <td>{getStatusBadge(apt.status)}</td>
              <td>
                <button className="btn-action">Confirmar</button>
                <button className="btn-action btn-cancel">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
