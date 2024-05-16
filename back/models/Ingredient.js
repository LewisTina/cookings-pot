// models/Ingredient.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    nom: String,
    unite: String,
    quantite: Number
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
