import gpio from 'gpio';
import moment from 'moment';

// pin 38 GPIO 20 - for trigger
const trig = gpio.export(38, {
  direction: 'out'
});

// pin 37 GPIO 26 - for echo
const echo = gpio.export(37, {
  direction: 'in'
});

function getDistance() {
  const speedSound = 34000;
  // resetting trigger
  trig.set(0);
  setTimeout(500);
  console.log("initial trig value (0): " + trig.value); // should be 0
  responsiveVoice.speak('');
  const timestamp = moment().add(30, 's');
  let start = 0;
  let end = 0;

  while (moment().isBefore(timestamp)) {
    trig.set();
    setTimeout(10);
    trig.set(0);

    while (echo.value === 0) {
      start = moment();
      console.log('Echo is 0');
    }

    while (echo.value === 1) {
      end = moment();
      console.log('Echo is 1');
      let timeDiff = end.diff(start);
      let distance = (timeDiff * speedSound) / 2;

      console.log('Distance = ' + distance);

      if (distance < 60) {
        console.log('User is within 2 ft. Enable voice');
        responsiveVoice.speak('Hello, I am Jarvis; welcome to Cardinal Solutions. Please check in.');
        break;
      }
    }
    break;
  }
  // set up recursive loop
  // function monitorWithTimeout() {

  //   console.log("monitoring");
  //   var pulseStart = moment().millisecond();

  //   // trigger on, then off then  monitor on change
  //   trig.set(function() {

  //     console.log("1 trig value (1): " + trig.value) // should be 1
  //     setTimeout(function() {

  //       trig.set(0, function() {
  //          console.log("2 trig value (0): " + trig.value) // should be 0

  //          console.log("echo value: " + echo.value)
  //          echo.on("change", function(val) {

  //            console.log("on change")

  //          });
  //       });

  //     }, 15);

  //   });

  //   setTimeout(function () {

  //     console.log("")
  //     // echo.removeAllListeners('change');
  //     if (moment().isBefore(timestamp) && monitor) {
  //       monitorWithTimeout();
  //     };

  //   }, 2000);
  // }

  // monitorWithTimeout();
}

module.exports = {
  getDistance
};
