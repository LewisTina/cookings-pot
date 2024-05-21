const Recipe = require('../models/Recipe');

exports.getRecipes = async (req, res) => {
    const Recipes = await Recipe.find().populate('categoryId ingredients');
    res.json(Recipes);
};

exports.getRecipesByCategoryId = async (req, res) => {
    const Recipes = await Recipe.find({ categoryId: req.params.categoryId }).populate('categoryId ingredients');
    res.json(Recipes);
};

exports.getRecipeById = async (req, res) => {
    const Recipe = await Recipe.findById(req.params.id).populate('categoryId ingredients');
    res.json(Recipe);
};

exports.createRecipe = async (req, res) => {
    const Recipe = new Recipe(req.body);
    await Recipe.save();
    res.json(Recipe);
};

exports.updateRecipe = async (req, res) => {
    const Recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Recipe);
};

exports.deleteRecipe = async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe supprimée' });
};
