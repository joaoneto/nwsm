'use strict';

// On window close
require('nw.gui').Window.get()
.on('close', function() {
  this.hide(); // Pretend to be closed already
  console.log('We\'re closing...');
  this.close(true);
});

// root module
angular.module('app.root', [
  'app.conf',
  'app.storage',
  'app.app-ctrl'
]);

// dashboard module
angular.module('app.dashboard', [
  'app.dashboard.dashboard-ctrl'
]);

// service module
angular.module('app.services', [
  'app.services.process',
  'app.services.services-ctrl'
]);

// install module
angular.module('app.install', [
  'app.install.checklist',
  'app.install.install-ctrl'
]);

// widgets module
angular.module('app.widgets', [
  'app.widgets.widgets',
  'app.widgets.widgets-ctrl'
]);

// app module
angular.module('app', [
  'ui.router',
  'app.root',
  'app.dashboard',
  'app.services',
  'app.install',
  'app.widgets'
]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
