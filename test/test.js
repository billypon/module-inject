var assert = require('assert');

var inject = require('..')();

it('inject', function () {
  var file;
  inject('dependency-parent', function (str, x) {
    file = x;
    if (str.indexOf('false') > 0) {
      return false;
    } else if (str.indexOf('module.exports') < 0) {
      throw 'fail to inject';
    }
    str = 'module.exports = false;';
    return str;
  });
  var fs = require('fs');
  var str = fs.readFileSync(file).toString();
  assert.equal(true, str.indexOf('false') > 0);
});
