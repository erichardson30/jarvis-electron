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
   ready: function() {
   }
});

var getDistance = function() {

  // resetting trigger
  trig.set(0);
  console.log("initial trig value (0): " + trig.value); // should be 0

  var monitor = true;
  var timestamp = moment().add(30, 's');

  // set up recursive loop
  function monitorWithTimeout() {

    console.log("monitoring");
    var pulseStart = moment().millisecond();

    // trigger on, then off then  monitor on change
    trig.set(function() {

      console.log("1 trig value (1): " + trig.value) // should be 1
      setTimeout(function() {

        trig.set(0, function() {
           console.log("2 trig value (0): " + trig.value) // should be 0

           if (echo.value == 1) {

             var pulseEnd = moment().millisecond();
             let duration = pulseEnd - pulseStart;
             console.log("duration: " + duration);

           }

          //  // on change
          //  echo.on("change", function(val) {
           //
          //    console.log("on change val: " + val)
           //
          //  });

        });

      }, 15);

    });

    setTimeout(function () {

      console.log("")
      // echo.removeAllListeners('change');
      if (moment().isBefore(timestamp) && monitor) {
        monitorWithTimeout();
      };

    }, 1000);
  }

  monitorWithTimeout();
};

module.exports = {
  getDistance : getDistance
};
