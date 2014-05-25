'use strict';

angular.module('app.storage', [])

.provider('storage', function () {
  var storage = window.localStorage;

  this.$get = angular.noop;

  this.get = function (key) {
    return JSON.parse(storage.getItem(key));
  };

  this.save = function (key, data) {
    storage.setItem(key, JSON.stringify(data));
  };

  this.remove = function (key) {
    storage.removeItem(key);
  };

  this.clearAll = function () {
    storage.clear();
  };
});
