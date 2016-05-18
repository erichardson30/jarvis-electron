var gpio = require("gpio");

var getDistance = function() { {

  console.log("getting distance inside proximity 1");

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

  var pulseStart = new Date();
  var pulseEnd = new Date();

  trig.set(function() {
    console.log("trig 1 value: ")
    console.log(trig.value);    // should log 1

    setTimeout(function off() {
      trig.reset();

      while(this.echo.value == 0) {
        pulseStart = new Date();
      }

      while(this.echo.value == 1) {
        pulseEnd = new Date();
      }

      let duration = pulseEnd.getTime() - pulseStart.getTime();
      let distance = duration * 17150;
      let centimeters = Math.round(distance * 100) / 100;
      console.log("centimeters: " + centimeters);

    }, 10);

  });

};

module.exports = getDistance;
