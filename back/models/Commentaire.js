// models/Commentaire.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentaireSchema = new Schema({
    texte: String,
    recetteId: { type: Schema.Types.ObjectId, ref: 'Recette' },
    membreId: { type: Schema.Types.ObjectId, ref: 'Membre' }
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);
