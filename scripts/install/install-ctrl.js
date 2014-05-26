'use strict';

angular.module('app.install.install-ctrl', [])

.controller('InstallCtrl', function ($scope, $state) {
  console.log('InstallCtrl called');
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.install', {
      url: '/install',
      templateUrl: 'scripts/install/install.tpl.html',
      controller: 'InstallCtrl',
      onEnter: function () {
        console.log('enter root.install');
      }
    });
});
