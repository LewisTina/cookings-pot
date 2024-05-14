const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController'); 

router.get('/', categorieController.getCategories);
router.get('/:id', categorieController.getCategorieById);
router.post('/', categorieController.createCategorie);
router.put('/:id', categorieController.updateCategorie);
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
