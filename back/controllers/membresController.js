const Membre = require('../models/Membre');
const utils = require('../utils/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMe = async (req, res) => {
    try {
        const token = req.get("authorization")?.split(' ')[1];
        if(!!token) {
            const decodedToken = jwt.verify(token, 'token');
            const id = decodedToken?.id

            if(!!id) {
                const membre = await Membre.findOne({ _id: id });
                if(!!membre) {
                    const returnMember = {
                        id: membre._id,
                        firstName: membre.firstName,
                        lastName: membre.lastName,
                        username: membre.username,
                        email: membre.email,
                        registrationDate: membre.registrationDate,
                    }
                    res.status(200).json({ 
                        data: returnMember, 
                        message: "Authentication success" 
                    });
                }
            } else {
                res.status(401).json({ message: "Credential invalid, action is not authorized" });
            }
        
        } else {
            res.status(500).json({ message: "Credential invalid, action is not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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
    const { login, password } = req.body;
    try {
        const membre = await Membre.findOne({ email: login });
        if (membre && bcrypt.compareSync(password, membre.password)) {
            const token = jwt.sign({ id: membre._id }, 'token', { expiresIn: '48h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Login ou mot de passe incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMembre = async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const username = utils.generateUsername(firstName, lastName)
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
