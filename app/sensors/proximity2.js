import gpio from 'gpio';

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
  responsiveVoice.speak('');
  let start = 0;
  let end = 0;
  let timeDiff = 0;
  let distance = 0;

  // resetting trigger
  trig.set(0);
  setTimeout(function() {
    console.log("initial trig value (0): " + trig.value); // should be 0
    trig.set();
    setTimeout(function() {
      trig.set(0);
    }, 10);
  }, 500);

  if (echo.value === 0) {
    console.log('Echo is zero');
    start = new Date().getTime / 1000;
  } else {
    console.log('Echo is ' + echo.value);

    end = new Date().getTime() / 1000;
    timeDiff = end - start;
    distance = (timeDiff * speedSound) / 2;

    console.log('Distance = ' + distance);

    if (distance < 60) {
      console.log('User is within 2ft.');
      return true;
    }
  }

  setTimeout(getDistance, 500);
}

module.exports = {
  getDistance
};
