import RaspiCam from 'raspicam-js';
import io from 'socket.io-client';
import fs from 'fs';

let socket = io(`http://10.104.100.30:8000`);
var data = {};

var camera = new RaspiCam({
    mode: "photo",
    output: "./image.jpg",
    encoding: "jpg",
    timeout: 1,
    n: true
});

camera.on("start", function( err, timestamp ){
    // console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ) {
    // console.log("photo image captured with filename: " + filename );
});

camera.on("exit", function(timestamp) {
    console.log("photo child process has exited at " + timestamp );

    console.log("notify employee: " + data.toString());
    fs.readFile('./image.jpg', function(err, buf) {
      socket.emit('image', { image: true, buffer: buf.toString('base64') });
      socket.emit('notifyBot', "I'M HERE", function (err) {
        if (err) {
          return console.error("Socket error" + err);
        }
      });
    })

});

function takePicture(data) {
    this.data = data;
    camera.start();
};

module.exports = {
    takePicture : takePicture
};
