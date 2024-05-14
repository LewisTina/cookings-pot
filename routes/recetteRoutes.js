// routes/recetteRoutes.js
const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recetteController');

router.get('/', recetteController.getRecettes);
router.get('/categorie/:categorieId', recetteController.getRecettesByCategorieId);
router.get('/:id', recetteController.getRecetteById);
router.post('/', recetteController.createRecette);
router.put('/:id', recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette);

module.exports = router;
