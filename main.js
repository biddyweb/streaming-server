//SOCKET IO PART!!!
function msgReceived(msg){
  $clientCounter.html(msg.clients);
}

$clientCounter = $("#client_count")

var socket = io.connect('http://localhost:4000');
socket.on('message', function(msg){msgReceived(msg)});


//WEBRTC Part
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {video: true};
var video = document.querySelector("video");
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var rafId;
var frames = [];
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;


function successCallback(localMediaStream) {
  window.stream = localMediaStream; // stream available to console
  video.src = window.URL.createObjectURL(localMediaStream);
  video.play();

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

function drawVideoFrame(time) {
  rafId = requestAnimationFrame(drawVideoFrame);
  ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  socket.emit('frame', {frame: canvas.toDataURL('image/webp', 1)});
};

rafId = requestAnimationFrame(drawVideoFrame); // Note: not using vendor prefixes!


function stop() {
  cancelAnimationFrame(rafId);  // Note: not using vendor prefixes!

}
