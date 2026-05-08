const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/appointments - Listar agendamentos
router.get('/', authorize('recepcionista', 'medico', 'admin'), appointmentController.getAll);

// POST /api/appointments - Criar agendamento (recepcionista)
router.post('/', authorize('recepcionista', 'admin'), appointmentController.create);

// PATCH /api/appointments/:id/status - Atualizar status
router.patch('/:id/status', authorize('recepcionista', 'medico', 'admin'), appointmentController.updateStatus);

module.exports = router;
