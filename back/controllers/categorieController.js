const Categorie = require('../models/Categorie');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategorieById = async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        res.json(categorie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCategorie = async (req, res) => {
    const categorie = new Categorie(req.body);
    try {
        await categorie.save();
        res.status(201).json(categorie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(categorie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCategorie = async (req, res) => {
    try {
        await Categorie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Categorie supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
