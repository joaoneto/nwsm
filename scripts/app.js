'use strict';

angular.module('app.services', ['app.services.process']);

angular.module('app', [
  'ui.router',
  // 'ui.router.stateHelper',
  'app.conf',
  'app.services'
])

.controller('AppCtrl', function ($scope, $state) {
  console.log('AppCtrl called');
  $scope.name = 'I am AppCtrl';
})

.config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider
    .when('', '/')
    .otherwise('/');

  $stateProvider
    .state('index', {
      // abstract: true,
      url: '/',
      templateUrl: 'partials/index.html',
      controller: 'AppCtrl',
      onEnter: function () {
        console.log('enter contacts');
      }
    })
})

.config(function (confProvider) {
  confProvider.set('services', [
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
        '--dir', '/opt/redis/',
        '--daemonize', 'yes',
        '--pidfile', '/opt/redis/redis.pid'
      ]
    }
  ]);
});

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
