var _ = require('lodash'),
    fs = require('fs');

_.templateSettings = _.extend(_.templateSettings, {
  evaluete: /\<\%([\s\S]+?)\%\>/g,
  interpolate: /\<\%=(.+?)\%\>/g,
  escape: /\<\%-(.+?)\%\>/g
});

function process(tpl, context, callback) {
  var last = tpl;
  try {
    while (tpl.indexOf('<%') >= 0) {
      tpl = _.template(tpl, context);
      if (tpl === last) break;
      last = tpl;
    }
  } catch (e) {
  }

  callback(null, tpl);
}

module.exports = function render(path, options, callback) {
  fs.readFile(path, 'utf8', function (err, tpl) {
    if (err) return callback(err);
    process(tpl, options, callback);
  });
};