exports.login = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'login',
    })
}

exports.singUp = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'singUp',
    })
}

exports.lgoOut = (request, response, next) => {
    response.status(200).json({
        status: 1,
        data: 'lgoOut',
    })
}