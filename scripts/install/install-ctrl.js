'use strict';

angular.module('app.install.install-ctrl', [])

.controller('InstallCtrl', function ($scope, $state) {
  console.log('InstallCtrl called');
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.install', {
      url: '/install',
      templateUrl: 'install.tpl.html',
      controller: 'SetupCtrl',
      onEnter: function () {
        console.log('enter root.install');
      }
    });
});
