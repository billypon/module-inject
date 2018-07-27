var fs = require('fs');

module.exports = function (root) {
  var find = typeof(root) === 'function' ? root : require('module-find')(root);
  return function (name, callback, hard) {
    var module = find(name);
    if (!module) {
      throw {message: 'no such module', name: name};
    }

    if (!callback) {
      return;
    }

    var file = require.resolve(module);

    if (!hard) {
      require(file);
      var module = require.cache[file];
      var exports = callback(module.exports, module);
      if (exports !== undefined) {
        module.exports = exports;
      }
    } else {
      var str = fs.readFileSync(file).toString();
      str = callback(str, file);
      if (str !== false) {
        fs.writeFileSync(file, str);
      }
    }
  }
}
