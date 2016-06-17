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

const speedSound = 34000;
// resetting trigger
trig.set(0);
setTimeout(500);

console.log("initial trig value (0): " + trig.value); // should be 0
responsiveVoice.speak('');

let start = 0;
let end = 0;

trig.set();
setTimeout(10);
trig.set(0);

while (echo.value === 0) {
  start = new Date().getTime() / 1000;
  console.log('Echo is ' + echo.value);
  trig.set(0);
}

while (echo.value === 1) {
  end = new Date().getTime() / 1000;
  console.log('Echo is ' + echo.value);
  let timeDiff = end - start;
  let distance = (timeDiff * speedSound) / 2;

  console.log('Distance = ' + distance);

  if (distance < 60) {
    console.log('User is within 2 ft. Enable voice');
    responsiveVoice.speak('Hello, I am Jarvis; welcome to Cardinal Solutions. Please check in.');
  }
}
