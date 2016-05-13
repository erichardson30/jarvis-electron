// var tessel = require('tessel');
var events = require('events');
var util = require('util');
var gpio = require("gpio");

// pin 38 GPIO 20 - for trigger
let trigger = gpio.export(38, {
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

function Proximity(trigger, echo, callback) {
  this.trigger = trigger;
  this.echo = echo;

  setImmediate(function ready() {
    this.emit('ready');
  }.bind(this));

  if (callback) {
    callback(null, this);
  }

  return this;
}

util.inherits(Proximity, events.EventEmitter);

Proximity.prototype.triggerRead = function() {
  this.trigger.write(1);
  setTimeout(function off() {
    this.trigger.write(0);
  }.bind(this), 10);
}

Proximity.prototype.getDistance = function(callback) {
  this.triggerRead(trig);
  this.echo.readPulse('high', 1000, function(err, duration) {

    if (err) {
      if (callback) {
        callback(err);
      }
      return;
    }

    var distance = ((duration * 1000)/2) / 29.1;

    setImmediate(function() {
      this.emit('data', distance);
    }.bind(this));

    if (callback) {
      callback(null, distance);
    }
  }.bind(this));
}

function use(callback) {
  return new Proximity(callback);
}

module.exports.getDistance;
module.exports.use = use;
module.exports.Proximity = Proximity;
