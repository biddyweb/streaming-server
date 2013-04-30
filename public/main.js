var ws = new WebSocket('ws://localhost:8080');
ws.binaryType = "arraybuffer";
ws.onopen = function() {
  console.log("Connection ready");
};
ws.onmessage = function(event) {
  console.log("Llego algo desde el server");
};


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
  //socket.emit('frame', {frame: canvas.toDataURL('image/webp', 1)});
  if (typeof ws != 'undefined' ) {
    var imagedata = ctx.getImageData(0,0,CANVAS_WIDTH, CANVAS_HEIGHT).data;
    
    var canvaslen = imagedata.length;
    var bytearray = new Uint8Array(canvaslen)
    for (var i=0;i<canvaslen;++i) {
        bytearray[i] = imagedata[i];
    }
    ws.send(bytearray.buffer);
  } else {
    console.log("Can't stream");
  }
};

rafId = requestAnimationFrame(drawVideoFrame); // Note: not using vendor prefixes!


function stop() {
  cancelAnimationFrame(rafId);  // Note: not using vendor prefixes!

}
