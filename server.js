var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var clients = [];

var wss = new WebSocketServer({server: server, clientTracking: false});
wss.on('connection', function(ws) {
  console.log("New connection: Nro Clients: " + clients.length);
  clients.push(ws);
  ws.on('message', function(data, flags) {
    console.log("Mensaje recibido %s Flags %s", Date(), flags.binary);

    //Send to all clients
    for (var i = 0; i < clients.length; i++) {
      clients[i].send(data, {binary: true});
    }
  });
  ws.on('close', function() {
    var idx = clients.indexOf(ws);
    if (idx > -1) {
      console.log("-- deleting client: ");
      delete clients[ws];
    };

    console.log('[close]\n');
  })
});
