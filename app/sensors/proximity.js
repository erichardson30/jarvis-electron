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
   ready: function() {
   }
});



var getDistance = function() {

  trig.set(function() {

    var timestamp = moment().add(30, 's');
    var pulseStart = moment().millisecond();
    var pulseEnd = moment().millisecond();
    var timestamp = moment().add(1, 'm');

    trig.set(function() {
      setTimeout(function() {
        trig.set(0, function() {

          let monitor = true;
          let now = moment();

          // monitoring while loop
          while(now.isBefore(timestamp) && monitor) {
            echo.on("change", function(val) {
              if (val = 1) {

                responsiveVoice.speak(" ");
                pulseEnd = new Date();
                let duration = pulseEnd.getTime() - pulseStart.getTime();
                console.log("duration: " + duration);

                if (duration < 300000) {
                  console.log("jarvis welcome")
                  responsiveVoice.speak("Hello I am Jarvis, welcome to Cardinal Solutions. Please check in", "UK English Male", {rate: 0.8});
                  monitor = false
                }

                let distance = duration * 17150;
                let centimeters = Math.round(duration * 100) / 100;
                console.log("centimeters: " + centimeters);
              }
            });
          }

          console.log("out of while loop")
          trig.reset();
          echo.reset();

        });
      }, 10);

    });
  });
};

module.exports = {
  getDistance : getDistance
};
