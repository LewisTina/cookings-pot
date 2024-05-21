const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    texte: String,
    recetteId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    membreId: { type: Schema.Types.ObjectId, ref: 'Membre' }
});

module.exports = mongoose.model('Comment', CommentSchema);
