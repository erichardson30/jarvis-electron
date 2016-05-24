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

  var monitor = true;
  var timestamp = moment().add(30, 's');
  var now = moment();

  while(now.isBefore(timestamp) && monitor) {

    console.log("monitoring change");

    setTimeout(function() {
      trig.set(0, function() {

        console.log("trig set off 1 ");
        var pulseStart = moment().millisecond();
        var pulseEnd = moment().millisecond();

        trig.set(function() {

          console.log("trig set on");

          setTimeout(function() {

            console.log("10 milliseconds");

            trig.set(0, function() {

              console.log("trig set off 2");

                echo.on("change", function(val) {

                  console.log("on change")
                  if (val = 1) {

                    responsiveVoice.speak(" ");
                    pulseEnd = new Date();
                    let duration = pulseEnd - pulseStart;
                    console.log("duration: " + duration);

                    if (duration < 300000) {
                      console.log("jarvis welcome");
                      responsiveVoice.speak("Hello I am Jarvis, welcome to Cardinal Solutions. Please check in", "UK English Male", {rate: 0.8});
                      monitor = false
                    }

                    let distance = duration * 17150;
                    let centimeters = Math.round(duration * 100) / 100;
                    console.log("centimeters: " + centimeters);
                  }
                });

            });

          }, 10);
        });
      });

    }, 50);
  }
}

  console.log("out of while loop");
  trig.reset();
  echo.reset();
};

module.exports = {
  getDistance : getDistance
};
