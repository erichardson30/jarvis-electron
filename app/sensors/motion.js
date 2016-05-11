
const exec = require('child_process').exec;
var moment = require("moment");

// PIR motion
var gpio = require("gpio");

// Proximity
var statistics = require('math-statistics');
var usonic = require('r-pi-usonic');

var gpio4 = gpio.export(4, {
   direction: "in",
   ready: function() {
   }
});

// set up initial timestamp
var timestamp = moment().add(1, 'm');

// bind to the "change" event
gpio4.on("change", function(val) {

    // value will report either 1 or 0 (number) when the value changes
    if (val == 1) {

      var now = moment()
      if (now > timestamp) {

        console.log("turning / keeping screen on")
        const child = exec('xset s reset && xset dpms force on',
          (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
              console.log(`exec error: ${error}`);
            }
        });

      }

      // we launch the proximity sensor as soon as motion is detected or redetected, timeout will need to be tested
      var promxity = null;
      proximity = init({
          echoPin: 18, //Echo pin
          triggerPin: 17, //Trigger pin
          timeout: 1000, //Measurement timeout in µs
          delay: 60, //Measurement delay in ms
          rate: 5 //Measurements per sample
      });

    } else {
      timestamp = moment().add(1, 'm');
    }
});



var init = function(config) {

    console.log("launching proximity sensor")
    var sensor = usonic.sensor(config.echoPin, config.triggerPin, config.timeout);
    console.log(config);
    var distances;

    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances) {
                print(distances);
            }

            distances = [];
        }

        setTimeout(function() {
            distances.push(sensor());

            measure();
        }, config.delay);
    }());
};

var print = function(distances) {

    // also add a check if 5 minutes has passed since last speech
    var distance = statistics.median(distances);
    if (distance < 10) {
      responsiveVoice.speak("Hello, I am Jarvis. Welcome to Cardinal Solutions Group. Please check-in to connect with someone in the office.", "UK English Male");
    }
};
