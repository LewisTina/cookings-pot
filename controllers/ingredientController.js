// controllers/ingredientController.js
const Ingredient = require('/models/Ingredient');

exports.getIngredients = async (req, res) => {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
};

exports.getIngredientById = async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id);
    res.json(ingredient);
};

exports.createIngredient = async (req, res) => {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.json(ingredient);
};

exports.updateIngredient = async (req, res) => {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ingredient);
};

exports.deleteIngredient = async (req, res) => {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ingredient supprimé' });
};
