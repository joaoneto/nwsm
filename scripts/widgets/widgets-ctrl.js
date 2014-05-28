'use strict';

angular.module('app.widgets.widgets-ctrl', [])

.controller('WidgetsCtrl', function ($scope, $state) {
  console.log('WidgetsCtrl called');
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('widgets', {
      url: '/widgets',
      templateUrl: 'scripts/widgets/widgets.tpl.html',
      controller: 'WidgetsCtrl',
      onEnter: function () {
        console.log('enter widgets');
      }
    });
});
