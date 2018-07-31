var assert = require('assert');

var inject = require('..')();

it('inject', function () {
  inject('dependency-parent', function (exports) {
    return 'hello world';
  });
  assert.equal('hello world', require('dependency-parent'));
});

it('hard inject', function () {
  var file;
  inject('dependency-parent', function (str, x) {
    file = x;
    if (str.indexOf('false') > 0) {
      return false;
    } else if (str.indexOf('module.exports') < 0) {
      throw new Error('fail to inject');
    }
    str = 'module.exports = false;';
    return str;
  }, true);
  var fs = require('fs');
  var str = fs.readFileSync(file, 'utf-8');
  assert.equal(true, str.indexOf('false') > 0);
});
