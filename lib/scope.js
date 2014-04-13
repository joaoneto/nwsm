var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function Scope() {
  EventEmitter.call(this);
  this.setMaxListeners(0);
  this.$scope = {};
}

util.inherits(Scope, EventEmitter);

Scope.prototype.pub = function pub(key, value) {
  this.$scope[key] = value;
  this.emit(['pub', key].join(':'), value);

  return this;
};

Scope.prototype.sub = function sub(key, cb) {
  this.on(['pub', key].join(':'), cb);

  return this;
};

module.exports = Scope;
