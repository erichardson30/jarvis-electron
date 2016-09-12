var gpio = require("gpio");
var moment = require("moment");

// pin 38 GPIO 20 - for trigger
let trig = gpio.export(38, {
   direction: "out",
   interval: 10,
   ready: function() {
   }
});

// pin 37 GPIO 26 - for echo
let echo = gpio.export(37, {
   direction: "in",
   interval: 50,
   ready: function() {
   }
});

var getDistance = function() {

  // resetting trigger
  trig.set(0);
  responsiveVoice.speak(" ");

  var monitor = true;
  var timestamp = moment().add(30, 's');

  // set up recursive loop
  function monitorWithTimeout() {

    console.log("monitoring");
    var pulseStart = moment().millisecond();

    // trigger on, then off then  monitor on change
    trig.set(function() {

      setTimeout(function() {
        trig.set(0, function() {

          console.log("trig value (0): " + trig.value) // should be 0

           echo.on("change", function(val) {

             console.log("on change value: " + val);


           });

        });

      }, 15);

    });

    setTimeout(function () {

      console.log("remove all listeners")
      echo.removeAllListeners('change');
      if (moment().isBefore(timestamp) && monitor) {
        monitorWithTimeout();
      };

    }, 2000);
  }

  monitorWithTimeout();
};

module.exports = {
  getDistance : getDistance
};