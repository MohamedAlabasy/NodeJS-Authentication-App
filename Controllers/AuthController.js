const bcrypt = require('bcryptjs');
const Auth = require('../Models/AuthSchema');
// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
exports.login = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'login',
    })
}
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
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
// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
exports.getUserData = (request, response, next) => {
    Auth.findById(request.body.id)
        .then((data) => {
            if (data == null) {
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
// #=======================================================================================#
// #			                            lgoOut                                         #
// #=======================================================================================#
exports.lgoOut = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'lgo out',
    })
}