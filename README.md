### get-func-args

This package is used to get function arguments for all function types.

#### Example
```js
const getFuncArgs = require('get-func-args');
function f(a, b, { c, d = 2 }, e, f = 1) {
}
const args = getFuncArgs(f); // [ 'a', 'b', '{ c, d = 2 }', 'e', 'f = 1' ]
```
