// routes/commentaireRoutes.js
const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

router.get('/', commentaireController.getCommentaires);
router.get('/recette/:recetteId', commentaireController.getCommentairesByRecetteId);
router.get('/:id', commentaireController.getCommentaireById);
router.post('/', commentaireController.createCommentaire);
router.put('/:id', commentaireController.updateCommentaire);
router.delete('/:id', commentaireController.deleteCommentaire);

module.exports = router;
