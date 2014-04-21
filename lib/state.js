var Controller = require('./controller'),
    Template = require('./template');

function State() {
  this.states = {};

  return this;
}

State.prototype.add = function add(state, config) {
  config = config || {};
  config.controller = new Controller(config.controller);

  this.states[state] = config;

  return this;
};

State.prototype.go = function (state) {
  var state = this.states[state],
      ctrl = state.controller;

  this.prevState = this.currentState || '';
  this.currentState = state;

  // Run controller
  console.log('Pre run controller')
  ctrl.run();
  console.log('Post run controller')

  console.log('Pre compile')
  Template.compile(Template.load(state.template), ctrl.scope);
  console.log('Post compile')


  return this;
};

module.exports = new State();
module.exports.State = State;
