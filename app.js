const express = require('express');


const PORT = 8050;
const app = express();

// run server
app.listen(process.env.PORT || PORT, () => {
    console.log(`App Run at http://localhost:${PORT}`);
});

// middleware to get method and url
app.use((request, response, next) => {
    console.log(request.method, request.url);
    next();
})

let flag = true
app.use((request, response, next) => {
    if (flag) {
        console.log('aut');
        next()
    } else {
        console.log('not auth');
        next(new Error('Not Aut'))
    }
    // flag = !flag
})


// middleware not Found
app.use((request, response, next) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    })
})

// middleware error
app.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error + ''
    })
})

