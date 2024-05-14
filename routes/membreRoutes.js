// routes/membreRoutes.js
const express = require('express');
const router = express.Router();
const membreController = require('../controllers/membreController');

router.get('/', membreController.getMembres);
router.get('/:id', membreController.getMembreById);
router.post('/login', membreController.getMembreByEmailAndPassword);
router.post('/', membreController.createMembre);
router.put('/:id', membreController.updateMembre);
router.delete('/:id', membreController.deleteMembre);

module.exports = router;
