var express = require('express');

var app = express();
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 4000...");
})

var io = require('socket.io')(server); //Bind socket.io to our express server.

app.use(express.static(__dirname + '/public')); //Send index.html page on GET /

/*io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})*/

io.on('connection', onConnection);

var connectedSocket = null;
function onConnection(socket){
    connectedSocket = socket;
}

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3'); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
const parser = port.pipe(new Readline()); //Read the line only when new line comes.
parser.on('data', function (data) {
    io.emit('data', { data: data });
});