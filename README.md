## Usage

runtime inject:

```javascript
var inject = require('module-inject')();
inject('dep-name', function (exports) {
  // modify exports
  exports.foo = 'bar';

  // overwrite exports
  return 'hello world';
});

console.log(require('dep-name'));
// -> hello world
```

hard inject:

```javascript
var inject = require('module-inject')();
inject('dep-name', function (str) {
  // skip writeback
  return false;

  // writeback
  return 'module.exports = "hello world"';
}, true); // <- attention

console.log(require('dep-name'));
// -> hello world
```
