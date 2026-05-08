const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/medical-records/patient/:paciente_id - Prontuários do paciente (apenas médico)
router.get('/patient/:paciente_id', authorize('medico', 'admin'), medicalRecordController.getByPatient);

// GET /api/medical-records/:id - Buscar prontuário por ID (apenas médico)
router.get('/:id', authorize('medico', 'admin'), medicalRecordController.getById);

// POST /api/medical-records - Criar prontuário (apenas médico)
router.post('/', authorize('medico'), medicalRecordController.create);

module.exports = router;
