import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import PM from '../models/pmModel.js';

/**
 * @description   Post new comment
 * @route         POST /api/comments/:id
 * @access        Protect
 */
const postNewComment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;

  const userId = req.user._id;

  const comment = await Comment.create({
    postId,
    userId,
    content,
  });

  const user = await User.findById(userId);
  const post = await Post.findById(postId);

  try {
    user.comments.push(comment);
    user.save();

    post.comments.push(comment);
    post.save();

    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error('New Comment Error.');
  }
});

/**
 * @description   Get comment by id
 * @route         GET /api/comments/:id
 * @access        Private
 */
// FIXME sem uso no front
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found.');
  }
  res.json(comment);
});

/**
 * @description   Delete comment by id
 * @route         DELETE /api/comments/:id
 * @access        Private, Admin
 */
const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId);
  const user = await User.findById(comment.userId);
  const post = await Post.findById(comment.postId);

  user.comments.pull(commentId);
  post.comments.pull(commentId);

  if (comment) {
    await Comment.deleteOne({ _id: commentId });
    res.status(200).send(true);
  } else {
    res.status(404);
    throw new Error('Comment not found.');
  }
});

/**
 * @description   Get all comments
 * @route         GET /api/comments/
 * @access        Admin
 */
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({});

  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404);
    throw new Error('Comments not found.');
  }
});

/**
 * @description   Comment Like
 * @route         GET /api/comments/:id
 * @access        Private
 */
const likeComment = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const comment = await Comment.findByIdAndUpdate(
    { _id: id },
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404);
    throw new Error('Comment not found.');
  }
});

/**
 * @description   Get all pms
 * @route         GET /api/private
 * @access        Admin
 */
const get_all_pm = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const pm = await PM.find({});

  if (pm) {
    res.status(200).json(pm);
  } else {
    res.status(404);
    throw new Error('Private messages not found.');
  }
});

/**
 * @description   Update comment
 * @route         PUT /api/comments/:id
 * @access        Private
 */
const putComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    comment.content = req.body.content || comment.content;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404);
    throw new Error('Comment not found.');
  }
});

/**
 * @description   Post new private message
 * @route         POST /api/private
 * @access        Private
 */
const post_new_pm = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { content, friendId } = req.body;

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (user && friend) {
    const myPM = await PM.create({
      userId,
      friendId,
      content,
    });

    const hisPM = await PM.create({
      userId: friendId,
      friendId: userId,
      content,
    });

    user.pm.push(myPM);
    friend.pm.push(hisPM);

    user.save();
    friend.save();

    res.send(true);
  } else {
    res.status(404);
    throw new Error('Private Message error.');
  }
});

/**
 * @description   Get pm by user id
 * @route         GET /api/private/:userId
 * @access        Protect
 */
const get_pm_by_user = asyncHandler(async (req, res) => {
  const pm = await PM.find({ userId: req.user._id });

  if (pm) {
    res.status(200).json(pm);
  } else {
    res.status(404);
    throw new Error('Private messages not found.');
  }
});

/**
 * @description   Delete Private message
 * @route         GET /api/private/:pmId
 * @access        Protect
 */
const delete_pm = asyncHandler(async (req, res) => {
  const pm = await PM.find({
    userId: req.user._id,
    friendId: req.body.friendId,
  });

  const user = await User.findById(req.user._id);

  if (pm && user) {
    try {
      user.pm.pull({ _id: pm[0]._id });
      user.save();

      await PM.deleteOne({ _id: pm[0]._id });

      res.send(true);
    } catch (error) {
      res.status(404);
      throw new Error('Private messages not found.');
    }
  } else {
    res.status(404);
    throw new Error('Private messages not found.');
  }
});

export {
  postNewComment,
  getCommentById,
  deleteComment,
  getComments,
  putComment,
  post_new_pm,
  get_all_pm,
  get_pm_by_user,
  delete_pm,
  likeComment,
};
