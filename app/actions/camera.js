'use strict';


var RaspiCam = require("raspicam");

const Camera = {

	var camera = new RaspiCam({
		mode: "photo",
		output: "./photo/image.jpg",
		encoding: "jpg",
		timeout: 1 // take the picture immediately
	});

	camera.on("start", function( err, timestamp ){
		console.log("photo started at " + timestamp );
	});

	camera.on("read", function( err, timestamp, filename ){
		console.log("photo image captured with filename: " + filename );
	});

	camera.on("exit", function( timestamp ){
		console.log("photo child process has exited at " + timestamp );
	});

	function takePicture(){
		camera.start();
	}
}

export default Camera;
