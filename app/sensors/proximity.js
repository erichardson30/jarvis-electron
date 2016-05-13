// var tessel = require('tessel');
var events = require('events');
var util = require('util');
var gpio = require("gpio");

// pin 38 GPIO 20 - for trigger
var trig = gpio.export(38, {
   direction: "out",
   ready: function() {
   }
});

// pin 37 GPIO 26 - for echo
var echo = gpio.export(37, {
   direction: "in",
   ready: function() {
   }
});

function Proximity(callback) {
  setImmediate(function ready() {
    this.emit('ready');
  }.bind(this));

  if (callback) {
    callback(null, this);
  }
  return this;
}

util.inherits(Proximity, events.EventEmitter);

Proximity.prototype.trigger = function() {
  this.trig.set(1);
  setTimeout(function off() {
    this.trig.set(0);
  }.bind(this), 10);
}

Proximity.prototype.getDistance = function(callback) {

  var pulseStart = Date.now();
  var pulseEnd = Date.now();
  this.trigger(trig);
  while(this.echo.value == 0) {
    pulseStart = Date.now();
  }

  while(this.echo.value == 1) {
    pulseEnd = Date.now();
  }

  let duration = pulseEnd - pulseStart;
  let distance = duration * 17150;
  let centimeters = Math.round(distance * 100) / 100;
  console.log("centimeters: " + centimeters);
  var distance = ((duration * 1000)/2) / 29.1;
  if (callback) {
    callback(null, distance);
  }
}.bind(this));

function use(callback) {
  return new Proximity(callback);
}

module.exports.getDistance;
module.exports.use = use;
module.exports.Proximity = Proximity;
