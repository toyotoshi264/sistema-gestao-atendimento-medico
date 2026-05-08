import React from 'react';
import '../styles/dashboard.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      <h2>Painel Principal</h2>
      <p className="welcome">Bem-vindo(a), <strong>{user.username}</strong> ({user.role})</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Consultas Hoje</h3>
          <span className="stat-number">12</span>
        </div>
        <div className="stat-card">
          <h3>Pacientes Cadastrados</h3>
          <span className="stat-number">248</span>
        </div>
        <div className="stat-card">
          <h3>Aguardando Atendimento</h3>
          <span className="stat-number">3</span>
        </div>
        <div className="stat-card">
          <h3>Consultas Concluídas</h3>
          <span className="stat-number">9</span>
        </div>
      </div>

      <div className="recent-section">
        <h3>Próximas Consultas</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Horário</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:30</td>
              <td>Maria Silva</td>
              <td>Dr. Carlos Mendes</td>
              <td><span className="badge badge-confirmed">Confirmado</span></td>
            </tr>
            <tr>
              <td>09:00</td>
              <td>João Santos</td>
              <td>Dra. Ana Oliveira</td>
              <td><span className="badge badge-scheduled">Agendado</span></td>
            </tr>
            <tr>
              <td>09:30</td>
              <td>Pedro Almeida</td>
              <td>Dr. Carlos Mendes</td>
              <td><span className="badge badge-scheduled">Agendado</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
