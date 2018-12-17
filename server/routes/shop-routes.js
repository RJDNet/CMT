const router = require('express').Router();
const Product = require('../models/product');

const cloudinary = require('cloudinary');

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
}

// Get Products Route
router.get('/', (req, res) => {
  Product.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .then(products => {
      products.user = undefined;
      return res.json(products);
    })
    .catch(err => res.status(404).json({ message: 'Error Fetching Products' }));
});

// New Product Route
router.post('/', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  const fileGettingUploaded = req.body.image;
  cloudinary.v2.uploader.upload(fileGettingUploaded,
    {
      width: 220,
      height: 220,
      crop: "fill"
    }, (error, result) => {
      const newProduct = new Product({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        price: req.body.price,
        image: result
      });

      newProduct.save().then(product => {
        product.user = undefined;
        return res.json(product);
      })
        .catch(err => res.status(400).json({ message: 'Error creating product' }));
    });
});

// Edit Product Route
router.post('/edit', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  const fileGettingUploaded = req.body.image;

  Product.findById({ _id: req.body.id })
    .then(product => {
      cloudinary.v2.uploader.upload(fileGettingUploaded, { public_id: product.image.public_id, invalidate: true },
        (error, result) => {

          const newProduct = {
            title: req.body.title,
            text: req.body.text,
            category: req.body.category,
            price: req.body.price,
            image: result
          };

          Product.findByIdAndUpdate(
            req.body.id,
            { $set: newProduct },
            { new: true }
          )
            .then(product => {
              product.user = undefined;
              return res.json(product);
            })
            .catch(err => res.status(400).json({ message: 'Unable to update product' }));
        });
    });
});

// Delete Product Route
router.delete('/:id', authCheck, (req, res) => {
  if (req.user.email === 'admin@admin.com') {
    return res.status(403);
  };

  Product.findById({ _id: req.params.id })
    .then(product => {
      cloudinary.v2.uploader.destroy(product.image.public_id,
        { invalidate: true }, (error, result) => {
          console.log(result, error)
        });

      // product.remove((err, product) => {
      //   return res.json(product);
      // });
      product.remove().then(product => {
        product.user = undefined;
        return res.json(product);
      })
        .catch(err => res.status(400).json({ message: 'Unable to delete product' }));
    })
    .catch(err => res.status(400).json({ message: 'Product not found' }));
});

module.exports = router;