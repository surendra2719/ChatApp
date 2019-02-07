const router = require('./Routes/routes')
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator());
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/',router);

// Configuring the database
const dbConfig = require('./Config/db.Config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to chatApp"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});