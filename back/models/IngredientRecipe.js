const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    unit: String,
    quantity: Number,
    idRecipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    idIngredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
