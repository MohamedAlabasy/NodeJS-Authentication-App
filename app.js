const express = require('express');
const router = require('./Routers/AuthRouter');
const body_parser = require('body-parser');
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


//to add header or use cors
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");//alow to any web side to connect to my server
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); //for routs
    response.header("Access-Control-Allow-Header", "Content-Type,Authorization");
    next();
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use('', router);

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

