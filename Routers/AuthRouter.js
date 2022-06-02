const express = require('express');
const route = express.Router();
const controller = require('../Controllers/AuthController')

route.post('/login', controller.login);
