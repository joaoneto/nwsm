var _ = require('lodash'),
    pkg = require('../package.json'),
    service = require('../lib/service'),
    utils = require('../lib/utils');

var Window = {};
var $ = Window.$ = window.$;

Window.container = $('#container');

Window.setTitle = function setTitle(str) {
  window.document.title = str || pkg.description;
};

Window.listProcesses = function listProcesses() {
  service.list(function (err, status) {
    _.forOwn(status, function (options, name) {
      Window.updateProcess(name, options);
    });
  });
};

Window.addProcess = function addProcess(name) {
  var processDiv = $('<div id="' + name + '" class="process">');

  processDiv
    .append($('<div class="process-name">'))
    .append($('<div class="process-usage-cpu">'))
    .append($('<div class="process-usage-mem">'))
    .append(
      $('<div class="process-actions">')
        .append(
          $('<a href="#" class="stop" data-process="' + name + '">').append($('<i class="fa fa-stop fa-fw">')),
          $('<a href="#" class="start" data-process="' + name + '">').append($('<i class="fa fa-play fa-fw">'))
        )
    );

  Window.container.append(processDiv);
  return processDiv;
};

Window.getProcess = function getProcess(name) {
  var processDiv = $('#' + name);

  if (!processDiv.length) {
    Window.addProcess(name);
    processDiv = $('#' + name);
  }

  return processDiv;
};

Window.updateProcess = function updateProcess(name, options) {
  var processDiv = Window.getProcess(name);

  processDiv.removeClass('up').removeClass('down').addClass(options.status);

  $('#' + name + ' .process-name').html(options.description || options.name);

  $('#' + name + ' .process-usage-cpu')
    .html(options.status === 'up' ? options.cpu.toFixed(3) + ' %' : 'n/a');

  $('#' + name + ' .process-usage-mem')
    .html(options.status === 'up' ? utils.bytesToSize(options.memory) : 'n/a');
};


$('a.stop').live('click', function (e) {
  var processName = $(this).attr('data-process');

  e.preventDefault();
  service.kill(processName);
});

$('a.start').live('click', function (e) {
  var processName = $(this).attr('data-process');

  e.preventDefault();
  service.spawn(processName);
});


module.exports = Window;
