const express = require('express');

const router = require('express-promise-router')();

const merchantController = require('../controllers/officialdriver/merchant');

// Add Store Route
router.route('/add').post(merchantController.add);

module.exports = router;
