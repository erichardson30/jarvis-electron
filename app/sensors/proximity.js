var gpio = require("gpio");
var moment = require("moment");

// pin 38 GPIO 20 - for trigger
let trig = gpio.export(38, {
   direction: "out",

   ready: function() {
   }
});

// pin 37 GPIO 26 - for echo
let echo = gpio.export(37, {
   direction: "in",
   interval: 500,
   ready: function() {
   }
});



var getDistance = function() {

  var monitor = true;
  var timestamp = moment().add(30, 's');
  var now = moment();

  // resetting trigger
  trig.set(0);
  console.log("initial trig value (0): " + trig.value) // should be 0

  while(now.isBefore(timestamp) && monitor) {

    console.log("monitoring change");
    setTimeout(function() {

        var pulseStart = moment().millisecond();
        var pulseEnd = moment().millisecond();

        trig.set(function() {

          console.log("1 trig value (1): " + trig.value) // should be 1
          setTimeout(function() {

            trig.set(0, function() {

              console.log("2 trig value (0): " + trig.value) // should be 0
              // on change

            });

          }, 10);

        });

    }, 1000);
    now = moment();
  }

  console.log("out of while loop");
  trig.reset();
  echo.reset();
};

module.exports = {
  getDistance : getDistance
};
