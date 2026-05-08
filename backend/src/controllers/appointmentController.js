const pool = require('../config/database');

// Listar agendamentos (com filtros)
const getAll = async (req, res) => {
  try {
    const { data, medico_id, status } = req.query;
    let query = `
      SELECT a.*, p.nome as paciente_nome, m.nome as medico_nome, m.especialidade
      FROM agendamento a
      JOIN paciente p ON a.paciente_id = p.id
      JOIN medico m ON a.medico_id = m.id
      WHERE 1=1
    `;
    const params = [];

    if (data) {
      params.push(data);
      query += ` AND a.data = $${params.length}`;
    }
    if (medico_id) {
      params.push(medico_id);
      query += ` AND a.medico_id = $${params.length}`;
    }
    if (status) {
      params.push(status);
      query += ` AND a.status = $${params.length}`;
    }

    query += ' ORDER BY a.data DESC, a.hora ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar agendamento
const create = async (req, res) => {
  try {
    const { paciente_id, medico_id, data, hora, observacoes } = req.body;

    // Verificar conflito de horário
    const conflict = await pool.query(
      'SELECT id FROM agendamento WHERE medico_id = $1 AND data = $2 AND hora = $3 AND status != $4',
      [medico_id, data, hora, 'cancelado']
    );

    if (conflict.rows.length > 0) {
      return res.status(409).json({ error: 'Horário já ocupado para este médico' });
    }

    const result = await pool.query(
      `INSERT INTO agendamento (paciente_id, medico_id, data, hora, status, observacoes)
       VALUES ($1, $2, $3, $4, 'agendado', $5) RETURNING *`,
      [paciente_id, medico_id, data, hora, observacoes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar status do agendamento
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['agendado', 'confirmado', 'em_atendimento', 'concluido', 'cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const result = await pool.query(
      'UPDATE agendamento SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { getAll, create, updateStatus };
