// controllers/membreController.js
const Membre = require('/models/Membre');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMembres = async (req, res) => {
    const membres = await Membre.find();
    res.json(membres);
};

exports.getMembreById = async (req, res) => {
    const membre = await Membre.findById(req.params.id);
    res.json(membre);
};

exports.getMembreByEmailAndPassword = async (req, res) => {
    const { email, motDePasse } = req.body;
    const membre = await Membre.findOne({ email });

    if (membre && bcrypt.compareSync(motDePasse, membre.motDePasse)) {
        const token = jwt.sign({ id: membre._id }, 'votre_secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
};

exports.createMembre = async (req, res) => {
    const { nom, email, motDePasse } = req.body;
    const hashedPassword = bcrypt.hashSync(motDePasse, 8);
    const membre = new Membre({ nom, email, motDePasse: hashedPassword });

    await membre.save();
    res.json(membre);
};

exports.updateMembre = async (req, res) => {
    const membre = await Membre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(membre);
};

exports.deleteMembre = async (req, res) => {
    await Membre.findByIdAndDelete(req.params.id);
    res.json({ message: 'Membre supprimé' });
};
