'use strict';

// Inport node.js modules
window._ = window.require('lodash');
window.async = window.require('async');

// On window close
require('nw.gui').Window.get()
.on('close', function() {
  this.hide(); // Pretend to be closed already
  console.log("We're closing...");
  this.close(true);
});

// App root modules
angular.module('app.services', ['app.services.process']);
angular.module('app.setup', ['app.setup.checklist']);

// App module
angular.module('app', [
  'ui.router',
  'app.conf',
  'app.storage',
  'app.services',
  'app.setup'
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

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
