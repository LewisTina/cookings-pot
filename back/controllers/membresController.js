const Membre = require('../models/Membre');
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
            const token = jwt.sign({ id: membre._id }, 'votre_secret', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMembre = async (req, res) => {
    const { nom, email, motDePasse } = req.body;
    const hashedPassword = bcrypt.hashSync(motDePasse, 8);
    const membre = new Membre({ nom, email, motDePasse: hashedPassword });

    try {
        await membre.save();
        res.status(201).json(membre);
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
