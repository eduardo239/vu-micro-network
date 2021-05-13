import express from 'express';
import {
  postNewComment,
  getCommentById,
  deleteComment,
  getComments,
  putComment,
  likeComment,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(protect, getCommentById)
  .delete(protect, deleteComment)
  .put(protect, putComment);
router.route('/like/:id').get(protect, likeComment);
router.route('/').get(getComments).post(protect, postNewComment);
export default router;
