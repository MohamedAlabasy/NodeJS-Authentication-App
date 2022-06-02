const express = require('express');
const router = express.Router();
const controller = require('../Controllers/AuthController');
const { query, body, param } = require('express-validator');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/user', controller.getUserData);
router.get('', controller.getAllUsersData);
router.post('/logout', controller.lgoOut);


module.exports = router;