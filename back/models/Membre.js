const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembreSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    avatar: String,
    email: { type: String, unique: true },
    password: String,
    registrationDate: Date,
});

module.exports = mongoose.model('Membre', MembreSchema);