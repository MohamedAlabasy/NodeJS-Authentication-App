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
    response.status(200).json({
        status: 1,
        data: 'get User Data',
    })
}

exports.lgoOut = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'lgo out',
    })
}