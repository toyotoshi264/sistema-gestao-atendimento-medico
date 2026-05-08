import React, { useState } from 'react';
import '../styles/patients.css';

function Patients() {
  const [showForm, setShowForm] = useState(false);
  const [patients] = useState([
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(44) 99999-1234', email: 'maria@email.com' },
    { id: 2, nome: 'João Santos', cpf: '987.654.321-00', telefone: '(44) 98888-5678', email: 'joao@email.com' },
    { id: 3, nome: 'Pedro Almeida', cpf: '456.789.123-00', telefone: '(44) 97777-9012', email: 'pedro@email.com' },
    { id: 4, nome: 'Ana Costa', cpf: '321.654.987-00', telefone: '(44) 96666-3456', email: 'ana@email.com' },
  ]);

  return (
    <div className="patients-page">
      <div className="page-header">
        <h2>Pacientes</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + Novo Paciente
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Cadastrar Novo Paciente</h3>
          <form className="patient-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" placeholder="Nome do paciente" />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input type="text" placeholder="000.000.000-00" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="text" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input type="text" placeholder="Rua, número, bairro" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Alergias</label>
              <textarea placeholder="Descreva alergias conhecidas"></textarea>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-primary">Salvar</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="patients-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.nome}</td>
                <td>{patient.cpf}</td>
                <td>{patient.telefone}</td>
                <td>{patient.email}</td>
                <td>
                  <button className="btn-action">Editar</button>
                  <button className="btn-action btn-view">Prontuário</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
