var Window = require('../lib/window'),
    $ = Window.$,
    _ = require('lodash'),
    utils = require('../lib/utils');

Window.setTitle('João Neto');

require('../lib/modal');

// $(Window.document).ready(function () {
//   Window.listProcesses();
//   setInterval(Window.listProcesses, 1000);
// });

var inject = function inject() {
  var args = [].slice.call(arguments),
      fn = args.pop();
  fn.inject = args;

  return fn;
};

var state = require('../lib/state'),
    Scope = require('../lib/scope'),
    Controller = require('../lib/controller');

state.add('index', {
  controller: function index() {
    this.teste = 'teste';
    console.log(Object.getOwnPropertyNames(this))
  },
  template: 'index'
});

// console.log(state.states);

state.go('index');
