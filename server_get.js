const express = require("express");
var app = express();
const port = 3000;
require('./database')();
require('./routers/router')(app);
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a client is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(()=>{
        x=parseInt(Math.random()*10);
        socket.emit('number', x);
        console.log('Emmiting Number '+x);
    }, 1000);
});

const bodyParser = require("body-parser");



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




http.listen(port, () => {
    console.log("Server is listening on port " + port);
});
