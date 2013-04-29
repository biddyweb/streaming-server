var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(4000);

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

app.get('/client.html', function(request, response){
  response.sendfile(__dirname + "/client.html");
});
app.get('/client.js', function(request, response){
  response.sendfile(__dirname + "/client.js");
});
app.get('/main.js', function(request, response){
  response.sendfile(__dirname + "/main.js");
});

var activeClients = 0;


io.sockets.on('connection', function(socket) {
  clientConnect(socket)
});

function clientConnect(socket){
  activeClients +=1;
  io.sockets.emit('message', {clients:activeClients});
  socket.on('disconnect', function(){clientDisconnect()});
  socket.on('frame', function(data) {
    io.sockets.emit('frame', data);
  });
}

function clientDisconnect(){
  activeClients -=1;
  io.sockets.emit('message', {clients:activeClients});
}
