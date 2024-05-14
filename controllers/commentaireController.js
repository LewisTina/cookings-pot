// controllers/commentaireController.js
const Commentaire = require('/models/Commentaire');

exports.getCommentaires = async (req, res) => {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
};

exports.getCommentairesByRecetteId = async (req, res) => {
    const commentaires = await Commentaire.find({ recetteId: req.params.recetteId });
    res.json(commentaires);
};

exports.getCommentaireById = async (req, res) => {
    const commentaire = await Commentaire.findById(req.params.id);
    res.json(commentaire);
};

exports.createCommentaire = async (req, res) => {
    const commentaire = new Commentaire(req.body);
    await commentaire.save();
    res.json(commentaire);
};

exports.updateCommentaire = async (req, res) => {
    const commentaire = await Commentaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(commentaire);
};

exports.deleteCommentaire = async (req, res) => {
    await Commentaire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commentaire supprimé' });
};
