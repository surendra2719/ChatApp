const router = require('./Routes/routes')
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
// create express app


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator());
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/',router);
require('dotenv').config()

connections = [];
io.sockets.on('connection', function (socket) {
    connections.push(socket)
    console.log("user connected")
    socket.on('new_msg', function (req) {
        console.log("client sent msg-->",req);
        chatControllers.addMessage(req,(err,result)=>{
            if(err){
                console.log("error on server while receiving data");
            }
            else{
                //console.log("msg saved",data);
                socket.emit('emitMsg',result);
            }
        })
       
    })
    })
//Disconnect
io.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log("user disconnected");
    
})
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
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});