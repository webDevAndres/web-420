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
// let composerAPI = require("./routes/macias-composer-routes");
let teamAPI = require("./routes/macias-team-routes");
// let personAPI = require("./routes/macias-person-routes");
// let userAPI = require("./routes/macias-session-routes");
// let customerAPI = require("./routes/macias-node-shopper-routes");
let app = express();
let bodyParser = require("body-parser");


app.set('port', process.env.PORT || 3000);
app.set(express.json());
// app.set(express.urlencoded({'extended': true}));
app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json()); //this is needed to have swagger pass the json to the node api

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
        explorer: true,
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/macias-team.js']
};

let openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', teamAPI);
// app.use('/api', composerAPI);
// app.use('/api', personAPI);
// app.use('/api', userAPI);
//  app.use('/api', customerAPI);


http.createServer(console.log("Application started and listening to port 3000"), app).listen(process.env.PORT || 3000);