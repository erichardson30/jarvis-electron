
const exec = require('child_process').exec;
var gpio = require("gpio");
var gpio4 = gpio.export(4, {
   direction: "in",
   ready: function() {
   }
});

// module.exports = {
const Motion = {
  // bind to the "change" event
  gpio4.on("change", function(val) {
     // value will report either 1 or 0 (number) when the value changes
     console.log(val)
     if (val == 1) {
       console.log("turning on screen")
       const child = exec('xset s reset && xset dpms force on',
         (error, stdout, stderr) => {
           console.log(`stdout: ${stdout}`);
           console.log(`stderr: ${stderr}`);
           if (error !== null) {
             console.log(`exec error: ${error}`);
           }
       });
     }
  });
};

export default Motion;
