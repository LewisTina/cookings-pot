// controllers/categorieController.js
const Categorie = require('/models/Categorie');

exports.getCategories = async (req, res) => {
    const categories = await Categorie.find();
    res.json(categories);
};

exports.getCategorieById = async (req, res) => {
    const categorie = await Categorie.findById(req.params.id);
    res.json(categorie);
};

exports.createCategorie = async (req, res) => {
    const categorie = new Categorie(req.body);
    await categorie.save();
    res.json(categorie);
};

exports.updateCategorie = async (req, res) => {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(categorie);
};

exports.deleteCategorie = async (req, res) => {
    await Categorie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categorie supprimée' });
};
