const express = require('express');

const router = require('express-promise-router')();

const homeController = require('../controllers/officialdriver/home');

// Home Route
router.route('/').get(homeController.match);

module.exports = router;
