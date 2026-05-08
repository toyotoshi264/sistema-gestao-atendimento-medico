const pool = require('../config/database');

// Listar todos os pacientes
const getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM paciente ORDER BY nome ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar pacientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar paciente por ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM paciente WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Cadastrar novo paciente
const create = async (req, res) => {
  try {
    const { nome, cpf, data_nascimento, telefone, email, endereco, alergias, medicamentos_uso } = req.body;

    const result = await pool.query(
      `INSERT INTO paciente (usuario_id, nome, cpf, data_nascimento, telefone, email, endereco, alergias, medicamentos_uso)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.id, nome, cpf, data_nascimento, telefone, email, endereco, alergias, medicamentos_uso]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar paciente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, endereco, alergias, medicamentos_uso } = req.body;

    const result = await pool.query(
      `UPDATE paciente SET nome = $1, telefone = $2, email = $3, endereco = $4, alergias = $5, medicamentos_uso = $6
       WHERE id = $7 RETURNING *`,
      [nome, telefone, email, endereco, alergias, medicamentos_uso, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { getAll, getById, create, update };
