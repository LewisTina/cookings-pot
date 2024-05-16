// controllers/recetteController.js
const Recette = require('../models/Recette');

exports.getRecettes = async (req, res) => {
    const recettes = await Recette.find().populate('categorieId ingredients');
    res.json(recettes);
};

exports.getRecettesByCategorieId = async (req, res) => {
    const recettes = await Recette.find({ categorieId: req.params.categorieId }).populate('categorieId ingredients');
    res.json(recettes);
};

exports.getRecetteById = async (req, res) => {
    const recette = await Recette.findById(req.params.id).populate('categorieId ingredients');
    res.json(recette);
};

exports.createRecette = async (req, res) => {
    const recette = new Recette(req.body);
    await recette.save();
    res.json(recette);
};

exports.updateRecette = async (req, res) => {
    const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(recette);
};

exports.deleteRecette = async (req, res) => {
    await Recette.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recette supprimée' });
};
