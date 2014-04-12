var fs = require('fs'),
    path = require('path'),
    cp = require('child_process'),
    _ = require('lodash'),
    storage = require('./storage'),
    usage = require('usage'),
    async = require('async');

var services = [
  {
    name: 'mongodb',
    description: 'Mongo DB',
    pid: '/data/db/mongod.lock',
    // pid: '/data/db/mongod.lock',
    path: '/opt/mongo/bin',
    bin: 'mongod',
    params: [
      '--pidfilepath', '/opt/mongo/mongod.lock'
    ]
  },
  {
    name: 'redis-server',
    description: 'Redis Server',
    pid: '/opt/redis/redis.pid',
    // pid: '/var/run/redis.pid',
    path: '/opt/redis/src',
    bin: 'redis-server',
    params: [
      '--daemonize', 'yes',
      '--pidfile', '/opt/redis/redis.pid'
    ]
  }
];

module.exports = {
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