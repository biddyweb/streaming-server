//SOCKET IO PART!!!
function msgReceived(msg){
  $clientCounter.html(msg.clients);
}

function processFrame(frame) {
  var img = new Image;
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
  img.src = frame.frame;
}

$clientCounter = $("#client_count")

var socket = io.connect('http://localhost:4000');
socket.on('message', function(msg){msgReceived(msg)});
socket.on('frame', function(frame){processFrame(frame)});


//WEBRTC Part
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

