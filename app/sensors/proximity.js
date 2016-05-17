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

function trigger() {
  this.trig.set(1);
  setTimeout(function off() {
    this.trig.set(0);
  }.bind(this), 10);
}

function getDistance() {

  console.log("getting distance inside proximity 1");
  var pulseStart = new Date();
  var pulseEnd = new Date();

  trig.set(function() {
    console.log("trig 1 value: ")
    console.log(trig.value);    // should log 1

    setTimeout(function off() {
      trig.reset();

      while(echo.value == 0) {
        pulseStart = new Date();
      }

      while(echo.value == 1) {
        pulseEnd = new Date();
      }

      let duration = pulseEnd.getTime() - pulseStart.getTime();
      let distance = duration * 17150;
      let centimeters = Math.round(distance * 100) / 100;
      console.log("centimeters: " + centimeters);

    }, 10);

  });

};

module.exports.getDistance = getDistance;
