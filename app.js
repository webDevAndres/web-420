/*
============================================
 Title: macias-composer.js
 Author: Andres Macias
 Date:   9/4/22
 Description: contains schema for composer
===========================================
*/


let express = require("express");
let http = require("http");
let swaggerUi = require("swagger-ui-express");
let swaggerJsdoc = require("swagger-jsdoc");
let mongoose = require("mongoose");
let composerAPI = require("./routes/macias-composer-routes");
let app = express();

app.set('port', process.env.PORT || 3000);
app.set(express.json());
app.set(express.urlencoded({'extended': true}));

let conn = 'mongodb+srv://web420_user:s3cret@buwebdev-cluster-1.pldlt.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas Successful`)
}).catch(error => {
    console.log(`MongoDB Error: ${error.message}`);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js']
};

let openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);


http.createServer(console.log("Application started and listening to port 3000"), app).listen(process.env.PORT || 3000);