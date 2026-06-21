import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/patients.css';

function Patients() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [patients, setPatients] = useState([
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(44) 99999-1234', email: 'maria@email.com' },
    { id: 2, nome: 'João Santos', cpf: '987.654.321-00', telefone: '(44) 98888-5678', email: 'joao@email.com' },
    { id: 3, nome: 'Pedro Almeida', cpf: '456.789.123-00', telefone: '(44) 97777-9012', email: 'pedro@email.com' },
    { id: 4, nome: 'Ana Costa', cpf: '321.654.987-00', telefone: '(44) 96666-3456', email: 'ana@email.com' },
  ]);
  const [formData, setFormData] = useState({ nome: '', cpf: '', telefone: '', email: '', nascimento: '', endereco: '', alergias: '' });

  const handleEdit = (patient) => {
    setEditingId(patient.id);
    setFormData({ ...patient });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ nome: '', cpf: '', telefone: '', email: '', nascimento: '', endereco: '', alergias: '' });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingId) {
      setPatients(patients.map(p => p.id === editingId ? { ...p, ...formData } : p));
      alert('Paciente atualizado com sucesso!');
    } else {
      const newPatient = { ...formData, id: patients.length + 1 };
      setPatients([...patients, newPatient]);
      alert('Paciente cadastrado com sucesso!');
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleProntuario = (patientId) => {
    navigate(`/prontuario/${patientId}`);
  };

  return (
    <div className="patients-page">
      <div className="page-header">
        <h2>Pacientes</h2>
        <button className="btn-primary" onClick={handleNew}>
          + Novo Paciente
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}</h3>
          <form className="patient-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" placeholder="Nome do paciente" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input type="date" value={formData.nascimento || ''} onChange={(e) => setFormData({...formData, nascimento: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="text" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@exemplo.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input type="text" placeholder="Rua, número, bairro" value={formData.endereco || ''} onChange={(e) => setFormData({...formData, endereco: e.target.value})} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Alergias</label>
              <textarea placeholder="Descreva alergias conhecidas" value={formData.alergias || ''} onChange={(e) => setFormData({...formData, alergias: e.target.value})}></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Salvar</button>
              <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancelar</button>
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
                  <button className="btn-action" onClick={() => handleEdit(patient)}>Editar</button>
                  <button className="btn-action btn-view" onClick={() => handleProntuario(patient.id)}>Prontuário</button>
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
