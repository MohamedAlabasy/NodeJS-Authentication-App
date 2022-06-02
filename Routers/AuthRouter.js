const express = require('express');
const router = express.Router();
const Auth = require('../Models/AuthSchema')
const controller = require('../Controllers/AuthController');
const { query, body, param } = require('express-validator');

router.post('/login', controller.login);
router.post('/register', [
    body('name').isAlpha().withMessage('invalid name'),
    body('email').isEmail().withMessage('invalid email')
        .custom((value) => {
            return Auth.findOne({ email: value })
                .then((data) => {
                    if (data)
                        return Promise.reject('Email already taken')
                })
        }),
    body('password').isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters'),
    body('gender').isIn(['male', 'female']).withMessage("gender must be male or female"),
], controller.register);
router.get('/user', controller.getUserData);
router.get('', controller.getAllUsersData);
router.delete('', controller.deleteUser);
router.post('/logout', controller.lgoOut);


module.exports = router;