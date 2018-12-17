const router = require('express').Router();
const Post = require('../models/post');

// User check
const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signin');
  } else {
    return next();
  }
}

// Get Blog Posts
router.get('/', (req, res) => {
  Post.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .then(posts => {
      posts.user = undefined;
      return res.json(posts);
    })
    .catch(err => res.status(404).json({ message: 'Error Fetching Posts' }));
});

// New Blog Post Route
router.post('/', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  const newPost = new Post({
    user: req.user.id,
    title: req.body.title,
    text: req.body.text
  });

  newPost.save().then(post => {
    post.user = undefined;
    return res.json(post);
  })
    .catch(err => res.status(400).json({ message: 'Error creating post' }));
});

// Edit Post Route
router.post('/edit', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  const newPost = {
    title: req.body.title,
    text: req.body.text
  };

  Post.findByIdAndUpdate(
    req.body.id,
    { $set: newPost },
    { new: true }
  )
    .then(post => {
      post.user = undefined;
      return res.json(post);
    })
    .catch(err => res.status(400).json({ message: 'Error updating post' }));
});

// Delete Post Route
router.delete('/:id', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  Post.findById({ _id: req.params.id })
    .then(post => {
      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(400).json({ message: 'Unable to delete post' }));
});

module.exports = router;