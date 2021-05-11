import express from 'express';
const router = express.Router();
import {
  authUser,
  getProfile,
  postUser,
  putUser,
  getUserById,
  getUsers,
  getUsersPosts,
  add_friend,
  delete_friend,
  deleteUser,
  admin_control,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(postUser).get(protect, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getProfile).put(protect, putUser);
router.route('/posts/:userId').get(protect, getUsersPosts);
router.route('/:id').get(protect, getUserById).delete(protect, deleteUser);

export default router;
