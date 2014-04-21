var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function Scope() {
  EventEmitter.call(this);
  this.setMaxListeners(0);

  return this;
}

util.inherits(Scope, EventEmitter);

Scope.prototype.watch = function (prop, handler) {
  var obj = this;

  // @todo: create get object by dot path
  if (/\./.test(prop)) {
    var keys = prop.split('.');

    prop = keys.pop();
    keys.forEach(function (k) {
      obj = obj[k];
    });
  }

  var fromPrototype = !Object.hasOwnProperty.call(obj, prop),
      val = obj[prop],
      getter = function () {
        return fromPrototype ? Object.getPrototypeOf(obj)[prop] : val;
      },
      setter = function (newVal) {
        fromPrototype = false;
        handler.call(obj, prop, val, newVal);
        return val = newVal;
      };

  if (delete obj[prop]) {
    Object.defineProperty(obj, prop, {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true
    });
  }

};

Scope.prototype.unwatch = function (prop) {
  var val = this[prop];
  delete this[prop]; // remove accessors
  this[prop] = val;
};

Scope.prototype.pub = function pub(key, value) {
  this[key] = value;
  this.emit(['pub', key].join(':'), value);

  return this;
};

Scope.prototype.sub = function sub(key, cb) {
  this.on(['pub', key].join(':'), cb);

  return this;
};

module.exports = Scope;
