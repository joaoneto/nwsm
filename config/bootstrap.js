var Window = require('../lib/window'),
    $ = Window.$,
    _ = require('lodash'),
    utils = require('../lib/utils');

Window.setTitle('João Neto');

require('../lib/modal');

$(Window.document).ready(function () {
  Window.listProcesses();
  setInterval(Window.listProcesses, 1000);
});
