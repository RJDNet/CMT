const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const Pkey = require('../models/pkey');
const Post = require('../models/post');
const Product = require('../models/product');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const cloudinary = require('cloudinary');

// Global Variables
// const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require('../config/keys');
const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = process.env;

// Cloudinary Config
cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
});

// User check
const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signin');
  } else {
    return next();
  }
};

// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');



////////////////// Routes //////////////////



// Signin with Email/Password 
router.post('/emailsignin', async (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(401).json(info); }
    if (!user) { return res.status(401).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(401).json(info); }
      return res.json({ success: true });
    });
  })(req, res, next);
});

// Signup with Email/Password
router.post('/emailsignup', async (req, res) => {
  const userEmail = req.body.email;
  const lowerUserEmail = userEmail.toLowerCase();

  const newUser = new User({
    email: lowerUserEmail,
    password: req.body.pass
  });

  const pass = await bcrypt.hash(req.body.pass, 10);
  newUser.password = pass;
  await User.findOne({ email: lowerUserEmail }).then(user => {
    if (!user) {
      newUser.save();
      return res.redirect('/dashboard');
    } else {
      return res.status(401).json({ message: 'User already exists' })
    }
  });
});

// Auth and callback routes with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), async (req, res) => {
  await res.redirect('/dashboard');
});

router.get('/redirect'), (req, res) => {
  res.redirect('auth/emailsignin');
};

// Delete account route
router.delete('/delete', authCheck, async (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  await User.deleteOne({ _id: req.user.id }, (err) => console.log(err));
  await Post.deleteMany({ user: req.user.id }, (err) => console.log(err));
  await Pkey.deleteOne({ user: req.user.id }, (err) => console.log(err));
  await Product.find({ user: req.user.id })
    .then(product => {
      if (product.length > 0) {
        const idFilter = product.map(fil => fil.image.public_id);
        cloudinary.v2.api.delete_resources(idFilter, (error, result) => {
          Product.deleteMany({ user: req.user.id }, (err) => console.log(err));
        });
      };
    });
  return await res.json({ success: true });
});

router.get('/key', authCheck, (req, res) => {
  const apikeygen = uuidv4();

  const apikey = new Pkey({
    user: req.user.id,
    apikey: apikeygen
  });

  Pkey.findOne({ user: req.user.id })
    .then(user => {
      if (!user) {
        return apikey.save().then(key => res.json({ key: key.apikey }));
      } else {
        return res.json({ key: user.apikey });
      };
    })
    .catch(err => res.status(404).json({ message: 'No key found' }));
});

router.get('/genkey', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  const apikeygen = uuidv4();

  Pkey.findOneAndUpdate(
    { user: req.user.id },
    { apikey: apikeygen },
    { new: true }
  )
    .then(key => res.json({ key: key.apikey }))
    .catch(err => res.status(400).json({ message: 'Unable to generate key' }));
});

module.exports = router;