const auth = require('../Models/AuthSchema');

exports.login = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'login',
    })
}

exports.register = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'register',
    })
}
exports.getUserData = (request, response, next) => {
    auth.findById(request.body.id);
    response.status(200).json({
        status: 1,
        data: 'get User Data',
    })
}

exports.getAllUsersData = (request, response, next) => {
    auth.find({})
        .then(data => {
            if (data == null) {
                throw new Error('No user to show');
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