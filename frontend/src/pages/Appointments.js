import React, { useState } from 'react';
import '../styles/appointments.css';

function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 1, paciente: 'Maria Silva', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '08:30', status: 'confirmado' },
    { id: 2, paciente: 'João Santos', medico: 'Dra. Ana Oliveira', data: '2025-05-08', hora: '09:00', status: 'agendado' },
    { id: 3, paciente: 'Pedro Almeida', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '09:30', status: 'agendado' },
    { id: 4, paciente: 'Ana Costa', medico: 'Dra. Ana Oliveira', data: '2025-05-08', hora: '10:00', status: 'concluido' },
    { id: 5, paciente: 'Lucas Ferreira', medico: 'Dr. Carlos Mendes', data: '2025-05-08', hora: '10:30', status: 'cancelado' },
  ]);

  const handleConfirm = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'confirmado' } : apt
    ));
    alert('Consulta confirmada com sucesso!');
  };

  const handleCancel = (id) => {
    if (window.confirm('Deseja realmente cancelar esta consulta?')) {
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelado' } : apt
      ));
      alert('Consulta cancelada.');
    }
  };

  const handleNewAppointment = (e) => {
    e.preventDefault();
    const newApt = {
      id: appointments.length + 1,
      paciente: e.target.paciente.value,
      medico: e.target.medico.value,
      data: e.target.data.value,
      hora: e.target.hora.value,
      status: 'agendado'
    };
    setAppointments([...appointments, newApt]);
    setShowForm(false);
    alert('Consulta agendada com sucesso!');
  };

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
          <form className="appointment-form" onSubmit={handleNewAppointment}>
            <div className="form-row">
              <div className="form-group">
                <label>Paciente</label>
                <select name="paciente" required>
                  <option value="">Selecione o paciente</option>
                  <option value="Maria Silva">Maria Silva</option>
                  <option value="João Santos">João Santos</option>
                  <option value="Pedro Almeida">Pedro Almeida</option>
                  <option value="Ana Costa">Ana Costa</option>
                </select>
              </div>
              <div className="form-group">
                <label>Médico</label>
                <select name="medico" required>
                  <option value="">Selecione o médico</option>
                  <option value="Dr. Carlos Mendes">Dr. Carlos Mendes - Clínico Geral</option>
                  <option value="Dra. Ana Oliveira">Dra. Ana Oliveira - Cardiologia</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data</label>
                <input type="date" name="data" required />
              </div>
              <div className="form-group">
                <label>Horário</label>
                <select name="hora" required>
                  <option value="">Selecione</option>
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea name="observacoes" placeholder="Observações sobre o agendamento"></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Agendar</button>
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
                {apt.status === 'agendado' && (
                  <>
                    <button className="btn-action" onClick={() => handleConfirm(apt.id)}>Confirmar</button>
                    <button className="btn-action btn-cancel" onClick={() => handleCancel(apt.id)}>Cancelar</button>
                  </>
                )}
                {apt.status === 'confirmado' && (
                  <button className="btn-action btn-cancel" onClick={() => handleCancel(apt.id)}>Cancelar</button>
                )}
                {(apt.status === 'concluido' || apt.status === 'cancelado') && (
                  <span className="no-actions">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
