const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('../Models/AuthSchema');
const { validate } = require('../Utils/validate')
// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
exports.login = (request, response, next) => {
    validate(request)
    Auth.findOne({ email: request.body.email }).select('+password +token')
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this email = ${request.body.email}`)
            } else {
                let passwordIsValid = bcrypt.compareSync(request.body.password, data.password)
                if (!passwordIsValid) {
                    throw new Error(`invalid password`)
                } else {
                    // to add token to router
                    const accessToken = jwt.sign({ id: data._id, email: data.email }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: 86400 //for 24 hour
                    });
                    // add token to db
                    Auth.findOneAndUpdate({ token: accessToken }).then(() => {
                        response.status(200).json({
                            status: 1,
                            data: {
                                id: data._id,
                                token: data.token,
                                name: data.name,
                                email: data.email,
                                gender: data.gender,
                            },
                        });
                    }).catch(error => {
                        next(error);
                    })
                }
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
exports.register = (request, response, next) => {
    validate(request)
    let hash = bcrypt.hashSync(request.body.password, 10);
    let user = new Auth({
        name: request.body.name,
        email: request.body.email,
        gender: request.body.gender,
        password: hash,
    })
    user.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    gender: data.gender,
                },
            })
        })
        .catch((error) => {
            next(error)
        })
}
// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
exports.getUserData = (request, response, next) => {
    validate(request)
    Auth.findById(request.body.id).select('-createdAt -updatedAt -__v')
        .then((data) => {
            if (data.length === 0) {
                throw new Error(`No user with this id = ${request.body.id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    data: data,
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
exports.getAllUsersData = (request, response, next) => {
    validate(request)
    Auth.find({}).select('-createdAt -updatedAt -__v')
        .then(data => {
            if (data.length === 0) {
                throw new Error('No user to show')
            } else {
                response.status(200).json({
                    status: 1,
                    data: data,
                });
            }
        }).catch(error => {
            next(error);
        })
}

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
exports.deleteUser = (request, response, next) => {
    validate(request)
    Auth.findByIdAndDelete(request.body.id)
        .then((data) => {
            if (data.length === 0) {
                throw new Error(`No user with this id = ${request.body.id}`)
            } else {
                data.deleteUser
                response.status(200).json({
                    status: 1,
                    message: 'deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                            lgoOut                                         #
// #=======================================================================================#
exports.lgoOut = (request, response, next) => {
    validate(request)
    Auth.findOneAndUpdate({ token: null }).then(() => {
        response.status(200).json({
            status: 1,
            data: 'logout successful',
        })
    }).catch(error => {
        next(error);
    })
}