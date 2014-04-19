var fs = require('fs');

var Template = {};

Template.load = function load(tplName) {
  return fs.readFileSync(__dirname + '/../templates/' + tplName + '.tpl', 'utf8');
};

Template.compile = function compile(tplName, scope) {
  var tpl = this.load(tplName);

  var each = tpl.match(/<repeat\s+data\-bind="(.+)">([\s\S]*?)<\/repeat>/);

  // console.log(each[1]);
  // console.log(each[2]);
  scope.watch('teste', function () {
    console.log(arguments);
  })
  console.log(scope);
};

module.exports = Template;
