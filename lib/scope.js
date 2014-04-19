var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function Scope() {
  EventEmitter.call(this);
  this.setMaxListeners(0);
  this.scope = {};

  return this;
}

util.inherits(Scope, EventEmitter);

Object.defineProperty(Scope.prototype, 'watch', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: function (prop, handler) {
    var oldval = this.scope[prop],
        newval = oldval,
        getter = function () {
          return newval;
        },
        setter = function (val) {
          oldval = newval;
          return newval = handler.call(this.scope, prop, oldval, val);
        };

    if (delete this.scope[prop]) { // can't watch constants
      Object.defineProperty(this.scope, prop, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  }
});

Object.defineProperty(Scope.prototype, 'unwatch', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: function (prop) {
    var val = this[prop];
    delete this.scope[prop]; // remove accessors
    this.scope[prop] = val;
  }
});

Scope.prototype.pub = function pub(key, value) {
  this.scope[key] = value;
  this.emit(['pub', key].join(':'), value);

  return this;
};

Scope.prototype.sub = function sub(key, cb) {
  this.on(['pub', key].join(':'), cb);

  return this;
};

module.exports = Scope;
