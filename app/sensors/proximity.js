var gpio = require("gpio");

// pin 38 GPIO 20 - for trigger
let trig = gpio.export(38, {
   direction: "out",
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

  console.log("inside getDistance");
  trig.set(function() {

    console.log("reset trigger 1");
    var pulseStart = new Date();
    var pulseEnd = new Date();

    trig.set(function() {

      console.log("set trigger");
      console.log("trig value - expecting 1: " + trig.value);
      setTimeout(function() {

        trig.set(0, function() {

          console.log("reset trigger 2");
          console.log("trig value - expecting 0: " + trig.value);
          console.log("echo value point 0: " + echo.value);

          echo.on("change", function(val) {

            console.log("change value: " + val)
            if (val = 1) {

              pulseEnd = new Date();
              console.log("echo value point 2: " + echo.value);

              let duration = pulseEnd.getTime() - pulseStart.getTime();
              console.log("duration: " + duration);
              let distance = duration * 17150;
              let centimeters = Math.round(distance * 100) / 100;
              console.log("centimeters: " + centimeters);

            } else {

              console.log("nothing")
              pulseStart = new Date();
            }

          });
        });

      }, 10);
    });
  });
};

module.exports = {
  getDistance : getDistance
};
