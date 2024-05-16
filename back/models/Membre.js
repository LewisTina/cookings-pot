// models/Membre.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembreSchema = new Schema({
    nom: String,
    email: { type: String, unique: true },
    motDePasse: String
});

module.exports = mongoose.model('Membre', MembreSchema);
