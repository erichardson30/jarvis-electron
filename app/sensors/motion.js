
import { exec } from 'child_process';
import gpio from 'gpio';
// import proximity from './proximity2';

const gpio4 = gpio.export(4, {
  direction: 'in',
});

// bind to the "change" event
gpio4.on('change', (val) => {
  // value will report either 1 or 0 (number) when the value changes

  if (val === 1) {
    console.log('turning on screen');
    exec('xset s reset && xset dpms force on',
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });
    console.log('checking proximity');
    // proximity.getDistance();
  }
});
