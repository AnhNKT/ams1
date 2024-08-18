const express = require('express');
const router = express.Router();

var ProductModel = require('../models/ProductModel')
var CharacterModel = require('../models/CharacterModel')

// Get all products
router.get('/admin', async (req, res) => {
   let products = await ProductModel.find({}).sort({ _id: -1 });
   res.render('product/admin', { products });
});

// Get all products for customers
router.get('/customer', async (req, res) => {
   let products = await ProductModel.find({}).sort({ _id: -1 });
   res.render('product/customer', { products });
});

// Get product by id
router.get('/detail/:id', async (req, res) => {
   try {
      let id = req.params.id;
      let product = await ProductModel.findById(id).populate('character');

      if (!product) {
         return res.status(404).send('Product not found');
      }

      console.log(product);
      res.render('product/detail', { product });
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});

// Delete product by id
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   try {
      await ProductModel.findByIdAndDelete(id);
      console.log('Delete succeed!');
   } catch (err) {
      console.error(err);
   }
   res.redirect('/product/admin');
});

// Render form to add product
router.get('/add', async (req, res) => {
   let character = await CharacterModel.find({});
   res.render('product/add', { character });
});

// Handle add product form submission
router.post('/add', async (req, res) => {
   try {
      let product = req.body;
      await ProductModel.create(product);
      console.log('Add product succeed!');
   } catch (err) {
      console.error(err);
   }
   res.redirect('/product/admin');
});

// Render form to edit product
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let product = await ProductModel.findById(id);
   res.render('product/edit', { product });
});

// Handle edit product form submission
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let product = req.body;
   try {
      await ProductModel.findByIdAndUpdate(id, product);
      console.log('Edit product succeed!');
   } catch (err) {
      console.log("Edit product failed !");
      console.error(err);
   }
   res.redirect('/product/admin');
});

// Handle search products
router.post('/search', async (req, res) => {
   let keyword = req.body.name;
   let products = await ProductModel.find({ name: new RegExp(keyword, "i") });
   res.render('product/admin', { products });
});

// Sort products ascending
router.get('/sort/asc', async (req, res) => {
   let products = await ProductModel.find().sort({ price: 1 });
   res.render('product/admin', { products });
});

// Sort products descending
router.get('/sort/desc', async (req, res) => {
   let products = await ProductModel.find().sort({ price: -1 });
   res.render('product/admin', { products });
});

module.exports = router;
