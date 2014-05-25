'use strict';

var fs = window.global.require('fs');
var path = window.global.require('path');
var cp = window.global.require('child_process');
var _ = window.global.require('lodash');
var usage = window.global.require('usage');
var async = window.global.require('async');
// var storage = window.global.require('./storage');

angular.module('app.services.process', [])
.factory('process', function (confProvider) {
  var services = confProvider.get('services');

  return {
    list: function (callback) {
      var results = {};

      async.each(services, function (service, cb) {
        fs.readFile(service.pid, 'utf8', function (err, pid) {
          if (err || !pid) {
            results[service.name] = {
              description: service.description,
              memory: .0,
              cpu: .0,
              status: 'down'
            };
            return cb();
          }

          usage.lookup(pid.replace(/\D/, ''), function (err, status) {
            results[service.name] = status;
            results[service.name].status = 'up';
            results[service.name].description = service.description;
            return cb(err);
          });
        });
      }, function (err) {
        callback(err, results);
      });
    },

    spawn: function (name) {
      var service = _.find(services, { 'name': name });
      var n = cp.spawn(path.join(service.path, service.bin), service.params || [], { detached: true });

      return n;
    },

    kill: function (name) {
      var service = _.find(services, { 'name': name });
      fs.readFile(service.pid, 'utf8', function (err, pid) {
        if (!err && pid) {
          process.kill(pid.replace(/\D/, ''), 'SIGTERM');
        }
      });
    }
  };
});
