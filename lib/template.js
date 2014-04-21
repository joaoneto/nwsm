var fs = require('fs'),
    _ = require('lodash'),
    async = require('async'),
    parser = new window.DOMParser();

var Template = {};

// core components
var components = {
  // nfw-repeat
  'nfw-repeat': [
    // nfw-repeat midlewares
    function scopeDataBind(element) {
      // `this` is the scope context
      console.log('scopeDataBind');
      var evil = element.getAttribute('data-bind').split(/\s+/);
      var template = element.getElementsByTagName('template')[0];

      // console.log(template.innerHTML);
      // console.log(this[evil[2]]);

      // this.watch('processes.p1', function () {
      //   console.log(arguments);
      // });

      this.watch('processes', function () {
        console.log(arguments);
      });
    },
    function logElement(element) {
      // console.log('logElement', element);
    }
  ],
  'nfw-button': [
    function button(element, next) {
      console.log('button', element);
      next();
    }
  ]
};


Template.load = function load(tplName) {
  return fs.readFileSync(__dirname + '/../templates/' + tplName + '.tpl', 'utf8');
};

Template.compile = function compile(tpl, scope) {
  var doc = parser.parseFromString(tpl, 'text/html');

  async.each(Object.keys(components), function (component, cb) {
    console.log('handle ' + component);

    [].slice.call(doc.getElementsByTagName(component)).forEach(function (element, index) {
      // execute component middlewares
      components[component].forEach(function (fn) {
        fn.call(scope, element);
      });
    });

    cb();
  },
  function (err) {

  });
};


module.exports = Template;
