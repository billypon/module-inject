var assert = require('assert');

var inject = require('..');
var cwd = process.cwd();

it('inject', function () {
  var file;
  inject('dependency-parent', function (str, x) {
    var change = false;
    if (str.indexOf('true')) {
      str = 'module.exports = false;';
      change = true;
    }
    file = x;
    return {str, change};
  }, cwd);
  var fs = require('fs');
  var str = fs.readFileSync(file).toString();
  assert.equal(true, str.indexOf('false') > 0);
});
