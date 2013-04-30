var ws = new WebSocket('ws://localhost:8080');
ws.binaryType = "arraybuffer";
ws.onopen = function() {
  console.log("Connection ready");
};

ws.onmessage = function(event) {
  var imageheight = 250;
  var imagewidth = 320;

  var bytearray = new Uint8Array(event.data);
  var tempcanvas = document.querySelector('canvas');
  tempcanvas.height = imageheight;
  tempcanvas.width = imagewidth;
  var tempcontext = tempcanvas.getContext('2d');

  var imgdata = tempcontext.getImageData(0,0,imagewidth,imageheight);

  var imgdatalen = imgdata.data.length;

  for(var i=8;i<imgdatalen;i++)
  {
    imgdata.data[i] = bytearray[i];
  }

  tempcontext.putImageData(imgdata,0,0);


};



