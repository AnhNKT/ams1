const express = require('express');
const router = express.Router();

const CarModel = require('../models/CarModel');

// Get all products for admin
router.get('/admin', async (req, res) => {
    let cars = await CarModel.find({}).sort({ _id: -1 })
    res.render('Car/admin', { cars })
 })

// Get all products for customers
router.get('/customer', async (req, res) => {
    let cars = await CarModel.find({}).sort({ _id: -1 })
    res.render('Car/customer', { cars })
 })

// Get product by id
router.get('/detail/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let cars = await CarModel.findById(id);

        if (!cars) {
            return res.status(404).send('Product not found');
        }

        console.log(cars);
        res.render('Car/detail', { cars });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete product by id
router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await CarModel.findByIdAndDelete(id);
        console.log('Delete succeed!');
        res.redirect('/Car/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Handle add product form submission
router.post('/add', async (req, res) => {
    try {
       //get input data
       let car = req.body
       //save book to DB
       await CarModel.create(car)
       //show message to console
       console.log('Add car succeed !')
    } catch (err) {
       console.error (err)
    }
 
    //redirect to book list page
    res.redirect('/Car/admin')
 })

// Render form to edit product
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id
    let cars = await CarModel.findById(id)
    res.render('Car/edit', { cars })
 })
 
 //process form "edit"
 router.post('/edit/:id', async (req, res) => {
    let id = req.params.id
    let cars = req.body
    try {
       await CarModel.findByIdAndUpdate(id, cars)
       console.log('Edit product succeed !')
    } catch (err) {
       console.log("Edit product failed !")
       console.error(err)
    }
    res.redirect('/Car/admin')
 })

// Handle search products
router.post('/search', async (req, res) => {
    try {
        let keyword = req.body.name;
        let cars = await CarModel.find({ name: new RegExp(keyword, "i") });
        res.render('Car/admin', { cars });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products ascending
router.get('/sort/asc', async (req, res) => {
    try {
        let cars = await CarModel.find().sort({ bounty: 1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('Car/admin', { cars });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Sort products descending
router.get('/sort/desc', async (req, res) => {
    try {
        let cars = await CarModel.find().sort({ bounty: -1 }); // Sắp xếp theo bounty nếu không có trường price
        res.render('Car/admin', { cars });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
