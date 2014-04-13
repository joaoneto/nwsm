var util = require('util'),
    async = require('async'),
    Scope = require('./scope');

function State() {
  Scope.call(this);

  this.prevState = '';
  this.currentState = 'index';
  this.controller = null;

  return this;
}

util.inherits(State, Scope);

State.prototype.go = function (state, config) {
  var self = this;
  config = config || {};

  async.waterfall([
    function before(err, next) {
      self.pub('before', state);

      next(err, config);
    },
    function transition(err, config, next) {
      config = config || {};

      this.prevState = this.currentState;
      this.currentState = state;
      this.controller = config.controller;

      // Exec controller
      async.waterfall([
        function before(err, next) {
          self.pub('before', state);

          next(err, config);
        },
        function run(err, config, next) {

        },
        function after(err, config, next) {
          self.pub('after', state);
          next(err, config);
        }
      ],
      function (err) {
        next(err, config);
      });

    },
    function after(err, config, next) {
      self.pub('after', state);
      next(err, config);
    }
  ],
  function (err) {

  });

  return self;
};

module.exports = new State();
