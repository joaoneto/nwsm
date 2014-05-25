'use strict';

angular.module('app.conf', [])

.provider('conf', function () {
  this.conf = {};

  this.$get = angular.noop;

  this.get = function (key) {
    return this.conf[key];
  };

  this.set = function (key, value) {
    return this.conf[key] = value;
  };
});
