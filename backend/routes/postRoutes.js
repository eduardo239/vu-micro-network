import express from 'express';
import {
  getPosts,
  getPostsById,
  postPost,
  deletePost,
  putPost,
  post_like,
  post_search,
  get_posts_by_user,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../routes/uploadRoutes.js';

const router = express.Router();

router.route('/').get(getPosts).post(upload.single('image'), postPost);
// TODO protect

router
  .route('/:id')
  .get(getPostsById)
  .delete(protect, deletePost)
  .put(protect, putPost);
router.route('/like/:id').get(post_like);
// router.route('/search/:term').get(protect, post_search);
// router.route('/my/:userId').get(protect, get_posts_by_user);

export default router;
