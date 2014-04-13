var Window = require('../lib/window'),
    $ = Window.$,
    _ = require('lodash'),
    utils = require('../lib/utils');

Window.setTitle('João Neto');

require('../lib/modal');

// $(Window.document).ready(function () {
//   Window.listProcesses();
//   setInterval(Window.listProcesses, 1000);
// });

var State = require('../lib/state'),
    Controller = require('../lib/controller');


var teste = new Controller;

teste.sub('before', function () {
  setTimeout(function () {
    console.log('subscribe before controller run 1');
  }, 1000);
});

teste.sub('before', function () {
  setTimeout(function () {
    console.log('subscribe before controller run 2');
  }, 1000);
});

teste.sub('after', function () {
  console.log('subscribe after controller run 1');
});

teste.sub('after', function () {
  console.log('subscribe after controller run 2');
});

teste.run();
