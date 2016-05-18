var gpio = require("gpio");

function getDistance() {

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

};

module.exports = getDistance;
