const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    nom: String,
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
