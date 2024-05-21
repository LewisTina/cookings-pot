const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'Membre' },
    note: Number,
    creationDate: Date,
    recetteId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
});

module.exports = mongoose.model('Comment', CommentSchema);
