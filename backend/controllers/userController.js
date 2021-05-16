import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Friend from '../models/friendModel.js';
import Post from '../models/postModel.js';
import PM from '../models/pmModel.js';
import Comment from '../models/commentModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description   Auth user and get token
 * @route         POST /api/users/login
 * @access        Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid email or password');
  }
});

/**
 * @description   Get user profile
 * @route         GET /api/users/profile
 * @access        Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'friends',
      populate: {
        path: 'userId',
        select: 'name imageAvatar',
      },
    })
    .populate({
      path: 'pm',
      populate: {
        path: 'friendId',
        select: 'name imageAvatar',
      },
    });

  if (user) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        imageAvatar: user.imageAvatar,
        friends: user.friends,
        pm: user.pm,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @description   Update user profile
 * @route         PUT /api/users/profile
 * @access        Private
 */
const putUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @description   Register a new user
 * @route         POST /api/users
 * @access        Public
 */
const postUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

/**
 * @description   Get user by id
 * @route         GET /api/users/:id
 * @access        Public
 */
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id)
    .populate({
      path: 'friends',
      populate: {
        path: 'userId',
        select: 'name imageAvatar',
      },
    })
    .populate({
      path: 'friends',
      populate: {
        path: 'friendId',
        select: 'name imageAvatar',
      },
    })
    .populate('posts')
    .populate({
      path: 'pm',
      populate: {
        path: 'friendId',
        select: 'name imageAvatar',
      },
    });

  if (user) {
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        imageAvatar: user.imageAvatar,
        friends: user.friends,
        pm: user.pm,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(400);
    throw new Error('User not found.');
  }
});

/**
 * @description   Get all users
 * @route         GET /api/users/all
 * @access        Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, null, {
    skip: 0,
    limit: 100,
    sort: { createdAt: -1 },
  }).populate('comments');

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('Users not found.');
  }
});

/**
 * @description   Get all posts by user
 * @route         GET /api/users/posts/:id
 * @access        Public
 */
const getUsersPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ userId: req.params.userId });

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not found.');
  }
});

/**
 * @description   Add a new user as friend
 * @route         POST /api/friend/
 * @access        Private
 */
const add_friend = asyncHandler(async (req, res) => {
  const { userId, friendId } = req.body;

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  const alreadyFriends = await Friend.find({ userId, friendId });

  if (alreadyFriends.length === 0) {
    const myFriends = await Friend.create({
      userId,
      friendId,
    });

    const hisFriends = await Friend.create({
      userId: friendId,
      friendId: userId,
    });

    user.friends.push(myFriends);
    friend.friends.push(hisFriends);

    user.save();
    friend.save();

    res.status(201).send(true);
  } else {
    throw new Error('This user is already your friend.');
  }
});

/**
 * @description   Remove friend
 * @route         DELETE /api/users/friends
 * @access        Private
 * TODO perguntar ao outro user aceita e adicionar nos dois
 */
const delete_friend = asyncHandler(async (req, res) => {
  const { userId, friendId } = req.body;

  const user1 = await Friend.find({ userId, friendId });
  const friend2 = await Friend.find({ userId: friendId, friendId: userId });

  if (!user1 && !friend2) {
    res.status(400).json({ message: 'This user is not your friend.' });
  } else {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user1.length === 0 || friend2.length === 0) {
      res.status(404).json({ message: 'Friends not found.' });
    } else {
      user.friends.pull(user1[0]._id);
      friend.friends.pull(friend2[0]._id);

      user.save();
      friend.save();

      await Friend.deleteOne({ _id: user1[0]._id });
      await Friend.deleteOne({ _id: friend2[0]._id });
      res.status(200).send(true);
    }
  }
});

/**
 * @description   Delete one user
 * @route         DELETE /api/users/:id
 * @access        Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    await Post.deleteMany({ userId: user._id });
    await Comment.deleteMany({ userId: user._id });
    await Friend.deleteMany({ userId: user._id });
    await Friend.deleteMany({ friendId: user._id });
    await User.deleteOne({ _id: user._id });
    res.send(true);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @description   Admin control
 * @route         DELETE /api/users/admin
 * @access        Admin
 */
const admin_control = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const posts = await Post.find({});
  const comments = await Comment.find({});
  const pms = await PM.find({});

  if (users || posts || comments) {
    res.json({
      users,
      posts,
      comments,
      pms,
    });
  } else {
    res.status(404);
    throw new Error('Data not found.');
  }
});

export {
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
};
