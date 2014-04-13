function State() {
  this.$states = [];
  return this;
}

State.prototype.add = function add(state, config) {
  config = config || {};

  this.prevState = this.currentState;
  this.currentState = state;
  this.controller = config.controller;

  return this;
};

State.prototype.go = function (state) {

  // Run controller
  this.controller.run();

  this.pub('done');

  return self;
};

module.exports = new State();
