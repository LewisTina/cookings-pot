const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');

router.get('/', commentController.getComments);
router.get('/recette/:recetteId', commentController.getCommentsByRecetteId);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
