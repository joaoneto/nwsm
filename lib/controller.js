var Scope = require('./scope');

function Controller(ctrl, scope) {
  this.controller = ctrl || function () {};
  this.scope = scope || new Scope();

  return this;
}

Controller.prototype.getInjectables = function getInjectables(fn) {
  var text = fn.toString();

  return text.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(', ');
};

Controller.prototype.run = function run() {
  // var injectables = this.getInjectables(this.controller);
  // console.log(injectables);
  // console.log(this.controller.inject);

  this.controller.apply(this.scope.scope, this.controller.inject);

  return this;
};

module.exports = Controller;
