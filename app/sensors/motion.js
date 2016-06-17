
const exec = require('child_process').exec;

var moment = require("moment");
var gpio = require("gpio");
var gpio4 = gpio.export(4, {
   direction: "in",
});

var proximity = require('./proximity');
// bind to the "change" event
gpio4.on("change", function(val) {
    // value will report either 1 or 0 (number) when the value changes
    if (val === 1) {
      console.log("turning on screen");
      const child = exec('xset s reset && xset dpms force on',
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
      });

      console.log("checking proximity");
      if (proximity.getDistance()) {
        setTimeout(3000);
      }
    }
});
