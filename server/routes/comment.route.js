const express = require('express');
const { getComments, addComment, deleteComment } = require('../controllers/comment.controller');
const {protect} = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/:adId', getComments);
router.post('/:adId', protect, addComment);
router.delete('/:commentId', protect, deleteComment);

module.exports = router;
