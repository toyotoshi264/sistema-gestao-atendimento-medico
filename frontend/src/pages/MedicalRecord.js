import React, { useState } from 'react';
import '../styles/medical-record.css';

function MedicalRecord() {
  const [showForm, setShowForm] = useState(false);

  const records = [
    {
      id: 1,
      data: '2025-04-20',
      medico: 'Dr. Carlos Mendes',
      diagnostico: 'J06 - Infecção aguda das vias aéreas superiores',
      prescricao: 'Amoxicilina 500mg 8/8h por 7 dias'
    },
    {
      id: 2,
      data: '2025-03-15',
      medico: 'Dra. Ana Oliveira',
      diagnostico: 'I10 - Hipertensão essencial',
      prescricao: 'Losartana 50mg 1x ao dia'
    }
  ];

  return (
    <div className="medical-record-page">
      <div className="page-header">
        <h2>Prontuário Eletrônico - Maria Silva</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + Novo Registro
        </button>
      </div>

      <div className="patient-info-card">
        <h3>Dados do Paciente</h3>
        <div className="info-grid">
          <div><strong>Nome:</strong> Maria Silva</div>
          <div><strong>CPF:</strong> 123.456.789-00</div>
          <div><strong>Nascimento:</strong> 15/03/1985</div>
          <div><strong>Telefone:</strong> (44) 99999-1234</div>
          <div><strong>Alergias:</strong> Dipirona, Penicilina</div>
          <div><strong>Medicamentos em uso:</strong> Losartana 50mg</div>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Novo Registro de Atendimento</h3>
          <form className="record-form">
            <div className="form-group full-width">
              <label>Anamnese (Queixa e Histórico)</label>
              <textarea rows="4" placeholder="Descreva a queixa principal e histórico da doença atual"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Exame Físico</label>
              <textarea rows="3" placeholder="Achados do exame físico"></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Diagnóstico (CID-10)</label>
                <input type="text" placeholder="Ex: J06 - Infecção vias aéreas" />
              </div>
              <div className="form-group">
                <label>Exames Solicitados</label>
                <input type="text" placeholder="Ex: Hemograma, PCR" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Prescrição Médica</label>
              <textarea rows="3" placeholder="Medicamentos, posologia e orientações"></textarea>
            </div>
            <div className="signature-info">
              Assinatura digital: Dr. Carlos Mendes - CRM 12345/PR
            </div>
            <div className="form-actions">
              <button type="button" className="btn-primary">Salvar Prontuário</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="records-history">
        <h3>Histórico de Atendimentos</h3>
        {records.map(record => (
          <div key={record.id} className="record-card">
            <div className="record-header">
              <span className="record-date">{new Date(record.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
              <span className="record-doctor">{record.medico}</span>
            </div>
            <div className="record-body">
              <p><strong>Diagnóstico:</strong> {record.diagnostico}</p>
              <p><strong>Prescrição:</strong> {record.prescricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecord;
