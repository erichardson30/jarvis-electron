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
    console.debug("CAMERA START " + new Date());
});

camera.on("read", function( err, timestamp, filename ) {
    // console.log("photo image captured with filename: " + filename );
    console.debug("CAMERA READ " + new Date());
});

camera.on("exit", function(timestamp) {
    console.debug("CAMERA EXIT " + new Date());

    // let message = data.firstName + ', someone is here to see you at the front'
    fs.readFile('./image.jpg', function(err, buf) {
        if(data.checkIn) {
            console.debug("EMIT NEW CHECK IN " + new Date());
            socket.emit('newCheckIn', { image: true, buffer: buf.toString('base64'), data: data });
        } else if(data.seeFront) {
            socket.emit('seeFront', { image: true, buffer: buf.toString('base64'), data: data });
        } else {
            console.debug("EMIT CHECK IN " + new Date());
            socket.emit('checkIn', { image: true, buffer: buf.toString('base64'), data: data });
        }
    });
});

function takePicture(userData) {
    console.debug("TAKE PICTURE " + new Date());
    data = userData;
    camera.start();
};

module.exports = {
    takePicture : takePicture
};
