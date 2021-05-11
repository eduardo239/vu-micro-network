import express from 'express';
import {
  postNewComment,
  getCommentById,
  deleteCommentById,
  getComments,
  putComment,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(protect, getCommentById)
  .delete(protect, deleteCommentById)
  .put(protect, putComment);

router.route('/').get(getComments).post(protect, postNewComment);
export default router;
