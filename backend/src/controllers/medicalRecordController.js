const pool = require('../config/database');

// Listar prontuários de um paciente
const getByPatient = async (req, res) => {
  try {
    const { paciente_id } = req.params;
    const result = await pool.query(
      `SELECT pr.*, m.nome as medico_nome, m.especialidade
       FROM prontuario pr
       JOIN medico m ON pr.medico_id = m.id
       WHERE pr.paciente_id = $1
       ORDER BY pr.data_atendimento DESC`,
      [paciente_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar prontuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar registro de prontuário
const create = async (req, res) => {
  try {
    const { paciente_id, agendamento_id, anamnese, exame_fisico, diagnostico_cid, prescricao, exames_solicitados } = req.body;

    // Buscar medico_id a partir do usuário logado
    const medicoResult = await pool.query(
      'SELECT id FROM medico WHERE usuario_id = $1',
      [req.user.id]
    );

    if (medicoResult.rows.length === 0) {
      return res.status(403).json({ error: 'Apenas médicos podem criar prontuários' });
    }

    const medico_id = medicoResult.rows[0].id;

    const result = await pool.query(
      `INSERT INTO prontuario (paciente_id, medico_id, agendamento_id, data_atendimento, anamnese, exame_fisico, diagnostico_cid, prescricao, exames_solicitados, assinatura_digital)
       VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, $9) RETURNING *`,
      [paciente_id, medico_id, agendamento_id, anamnese, exame_fisico, diagnostico_cid, prescricao, exames_solicitados, `Dr(a). ${req.user.username} - Assinado digitalmente`]
    );

    // Registrar log de auditoria
    await pool.query(
      `INSERT INTO log_auditoria (usuario_id, acao, entidade, entidade_id, dados_novos, ip_origem)
       VALUES ($1, 'CREATE', 'prontuario', $2, $3, $4)`,
      [req.user.id, result.rows[0].id, JSON.stringify(req.body), req.ip]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar prontuário por ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT pr.*, m.nome as medico_nome, m.crm, p.nome as paciente_nome
       FROM prontuario pr
       JOIN medico m ON pr.medico_id = m.id
       JOIN paciente p ON pr.paciente_id = p.id
       WHERE pr.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prontuário não encontrado' });
    }

    // Log de acesso ao prontuário
    await pool.query(
      `INSERT INTO log_auditoria (usuario_id, acao, entidade, entidade_id, ip_origem)
       VALUES ($1, 'READ', 'prontuario', $2, $3)`,
      [req.user.id, id, req.ip]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { getByPatient, create, getById };
