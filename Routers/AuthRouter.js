const express = require('express');
const router = express.Router();
const controller = require('../Controllers/AuthController');


router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/user', controller.getUserData);
router.post('/logout', controller.lgoOut);


module.exports = router;