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
    this.teste = 'ABC';

    var self = this;
    this.processes = {
      p1: {
        name: 'mongodb',
        cpu: 0.1,
        mem: 10
      }
    };

    setTimeout(function () {
      self.processes.p1 = {
        name: 'mongodb',
        cpu: 0.2,
        mem: 10
      };
      self.processes.p2 = {
        name: 'redis',
        cpu: 0.1,
        mem: 10
      };
    }, 3000)

    // this.watch('teste', function (a, b, c) {
    //   console.log(a, b, c);
    // });
  },
  template: 'index'
});

// console.log(state.states);

state.go('index');
