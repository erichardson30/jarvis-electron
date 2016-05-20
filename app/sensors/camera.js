import RaspiCam from 'raspicam-js';
import io from 'socket.io-client';
import fs from 'fs';

let socket = io(`http://jarviscsg.herokuapp.com:80`);
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

    console.log("notify employee: " + data.firstName);
    // let message = data.firstName + ', someone is here to see you at the front'
    fs.readFile('./image.jpg', function(err, buf) {
        if(data.checkIn) {
            socket.emit('newCheckIn', { image: true, buffer: buf.toString('base64'), data: data });
        } else {
            socket.emit('checkIn', { image: true, buffer: buf.toString('base64'), data: data });
        }
    });
});

function takePicture(userData) {
    data = userData;
    camera.start();
};

module.exports = {
    takePicture : takePicture
};
