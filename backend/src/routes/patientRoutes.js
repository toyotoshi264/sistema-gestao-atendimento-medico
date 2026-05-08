const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken, authorize } = require('../middleware/auth');

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// GET /api/patients - Listar pacientes (recepcionista e médico)
router.get('/', authorize('recepcionista', 'medico', 'admin'), patientController.getAll);

// GET /api/patients/:id - Buscar paciente por ID
router.get('/:id', authorize('recepcionista', 'medico', 'admin'), patientController.getById);

// POST /api/patients - Cadastrar paciente (recepcionista)
router.post('/', authorize('recepcionista', 'admin'), patientController.create);

// PUT /api/patients/:id - Atualizar paciente
router.put('/:id', authorize('recepcionista', 'admin'), patientController.update);

module.exports = router;
