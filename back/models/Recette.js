// models/Recette.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecetteSchema = new Schema({
    titre: String,
    description: String,
    categorieId: { type: Schema.Types.ObjectId, ref: 'Categorie' },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Recette', RecetteSchema);
