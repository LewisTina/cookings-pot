const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
    const Comments = await Comment.find();
    res.json(Comments);
};

exports.getCommentsByRecetteId = async (req, res) => {
    const Comments = await Comment.find({ recetteId: req.params.recetteId });
    res.json(Comments);
};

exports.getCommentById = async (req, res) => {
    const Comment = await Comment.findById(req.params.id);
    res.json(Comment);
};

exports.createComment = async (req, res) => {
    const Comment = new Comment(req.body);
    await Comment.save();
    res.json(Comment);
};

exports.updateComment = async (req, res) => {
    const Comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Comment);
};

exports.deleteComment = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment supprimé' });
};
