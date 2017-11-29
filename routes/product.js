const express = require('express');

const router = require('express-promise-router')();

const productController = require('../controllers/officialdriver/product');

// Add Product Route
router.route('/add').post(productController.addProduct);

// Get Product Route
router.route('/:id').get(productController.getProduct);

module.exports = router;
