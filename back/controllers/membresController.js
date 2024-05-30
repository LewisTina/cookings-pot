const Membre = require('../models/Membre');
const utils = require('../utils/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMembres = async (req, res) => {
    try {
        const membres = await Membre.find();
        res.json(membres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMembreById = async (req, res) => {
    try {
        const membre = await Membre.findById(req.params.id);
        res.json(membre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMembreByEmailAndPassword = async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
        const membre = await Membre.findOne({ email });
        if (membre && bcrypt.compareSync(motDePasse, membre.motDePasse)) {
            const token = jwt.sign({ id: membre._id }, 'token', { expiresIn: '48h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMembre = async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const username = utils.generateUsername(firstName, lastName)
    console.log(username)
    const registrationDate = new Date()

    const membre = new Membre({ 
        email, 
        lastName, 
        firstName, 
        username,
        registrationDate,
        password: hashedPassword
    });

    try {
        await membre.save();
        const token = jwt.sign({ id: membre._id }, 'token', { expiresIn: '48h' });
        res.status(201).json({
            id: membre._id, 
            message: "Enregistrement Réussi",
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMembre = async (req, res) => {
    try {
        const membre = await Membre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(membre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMembre = async (req, res) => {
    try {
        await Membre.findByIdAndDelete(req.params.id);
        res.json({ message: 'Membre supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
