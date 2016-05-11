
const exec = require('child_process').exec;

var moment = require("moment");
var proximity = require('proximity-hcsr04');

var gpio = require("gpio");
var gpio4 = gpio.export(4, {
   direction: "in",
   ready: function() {
   }
});

var timestamp = moment().add(1, 'm');

// bind to the "change" event
gpio4.on("change", function(val) {

    // value will report either 1 or 0 (number) when the value changes
    console.log(val)
    if (val == 1) {
      var now = moment()
      if (now > timestamp) {
        console.log("turning on screen")
        responsiveVoice.speak("Hello, I am Jarvis. Welcome to Cardinal Solutions Group.", "UK English Male");
        const child = exec('xset s reset && xset dpms force on',
          (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
              console.log(`exec error: ${error}`);
            }
        });
      }
    } else {
      timestamp = moment().add(1, 'm');
    }
});


var triggerPin = gpio.export(23, {
   direction: "out",
   ready: function() {
   }
});

var echoPin = gpio.export(24, {
   direction: "out",
   ready: function() {
   }
});

var proximityLib = require('prox-hcsr04');
var proximity = proximityLib.use(triggerPin, echoPin);

function printDistance() {
  proximity.getDistance(function(err, distance) {
    if (err) throw err;

    console.log("Distance: ", distance, "cm away.");

    printDistance();
  });
}

printDistance();
