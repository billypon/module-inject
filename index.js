var fs = require('fs');

module.exports = function (name, callback, root) {
  var find = require('module-find')(root);
  var module = find(name);
  if (!module) {
    return console.error('no such module: ' + (name instanceof Array ? name.join(', ') : name));
  }
  var file = require.resolve(module);
  var str = fs.readFileSync(file).toString();
  var result = callback(str, file);
  if (result.change) {
    fs.writeFileSync(file, result.str);
  }
}
