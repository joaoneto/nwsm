'use strict';

angular.module('app.services.services-ctrl', [])

.controller('ServicesCtrl', function ($scope, $state) {
  console.log('ServicesCtrl called');
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.services', {
      url: '/services',
      templateUrl: 'scripts/services/services.tpl.html',
      controller: 'ServicesCtrl',
      onEnter: function () {
        console.log('enter root.services');
      }
    });
});
