// models/Categorie.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
    nom: String
});

module.exports = mongoose.model('Categorie', CategorieSchema);
