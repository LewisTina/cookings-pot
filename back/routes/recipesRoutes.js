const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getRecipes);
router.get('/user/recipes', recipesController.getRecipes);
router.get('/categories/:categoryId', recipesController.getRecipesByCategoryId);
router.get('/:id', recipesController.getRecipeById);
router.post('/', recipesController.createRecipe);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
