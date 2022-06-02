const bcrypt = require('bcryptjs');

const Auth = require('../Models/AuthSchema');

exports.login = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'login',
    })
}

exports.register = (request, response, next) => {
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
                data: data,
            })
        })
        .catch((error) => {
            next(error)
        })
}
exports.getUserData = (request, response, next) => {
    Auth.findById(request.body.id);
    response.status(200).json({
        status: 1,
        data: 'get User Data',
    })
}

exports.getAllUsersData = (request, response, next) => {
    Auth.find({})
        .then(data => {
            if (data == null) {
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

exports.lgoOut = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'lgo out',
    })
}