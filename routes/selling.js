const express = require('express');

const router = require('express-promise-router')();

const sellingController = require('../controllers/officialdriver/selling');

// Connect Route
router.route('/connect').post(sellingController.connect);

module.exports = router;
