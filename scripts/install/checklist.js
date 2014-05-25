'use strict';

angular.module('app.install.checklist', [])

.provider('checklist', function (storageProvider) {
  this.$get = angular.noop;

  this.isFirstRun = function () {
    return !storageProvider.get('app.firstRun');
  };
})

.config(function (checklistProvider, confProvider) {
  if (checklistProvider.isFirstRun()) {

  }
  // confProvider.set('services', [
  //   {
  //     name: 'mongodb',
  //     description: 'Mongo DB',
  //     pid: '/data/db/mongod.lock',
  //     // pid: '/data/db/mongod.lock',
  //     path: '/opt/mongo/bin',
  //     bin: 'mongod',
  //     params: [
  //       '--pidfilepath', '/opt/mongo/mongod.lock'
  //     ]
  //   },
  //   {
  //     name: 'redis-server',
  //     description: 'Redis Server',
  //     pid: '/opt/redis/redis.pid',
  //     // pid: '/var/run/redis.pid',
  //     path: '/opt/redis/src',
  //     bin: 'redis-server',
  //     params: [
  //       '--dir', '/opt/redis/',
  //       '--daemonize', 'yes',
  //       '--pidfile', '/opt/redis/redis.pid'
  //     ]
  //   }
  // ]);
});
