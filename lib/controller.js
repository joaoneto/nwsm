var util = require('util'),
    async = require('async'),
    Scope = require('./scope');

function Controller() {
  Scope.call(this);
}

util.inherits(Controller, Scope);

Controller.prototype.set = function set(key, value) {
  this.pub(key, value);
};

module.exports = Controller;
