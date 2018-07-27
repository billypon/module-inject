var fs = require('fs');

module.exports = function (root) {
  var find = typeof(root) === 'function' ? root : require('module-find')(root);
  return function (name, callback) {
    var module = find(name);
    if (!module) {
      throw {message: 'no such module', name: name};
    }

    var file = require.resolve(module);
    var str = fs.readFileSync(file).toString();

    if (callback) {
      str = callback(str, file);
      if (str !== false) {
        fs.writeFileSync(file, str);
      }
    }
  }
}
