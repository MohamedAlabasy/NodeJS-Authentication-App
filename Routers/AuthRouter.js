const express = require('express');
const { query, body, param } = require('express-validator');

const Auth = require('../Models/AuthSchema')
const controller = require('../Controllers/AuthController');
const checkTokens = require('../Middleware/checkTokens');

const router = express.Router();
// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
router.post('/login', [
    body('email').isLength({ min: 0 }).withMessage('must enter email'),
    body('email').isEmail().withMessage('invalid email'),
], controller.login);


// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
router.post('/register', checkTokens, [
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

// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
router.get('/user', checkTokens, [
    body('id').isInt().withMessage('invalid id'),
], controller.getUserData);

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
router.get('', checkTokens, controller.getAllUsersData);

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
router.delete('', checkTokens, [
    body('id').isInt().withMessage('invalid id'),
], controller.deleteUser);

// #=======================================================================================#
// #			                            lgoOut                                         #
// #=======================================================================================#
router.post('/logout', checkTokens, controller.lgoOut);


module.exports = router;