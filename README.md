# nano-iterator
Really tiny iterator for arrays and objects.

## Usage
Require `iterate` function into your module.
```javascript
const { iterate } = require('nano-iterator');
```

Now you can iterate over:
- key/value pairs — `iterate(value)`;
- keys only — `iterate(value).keys()`;
- values only — `iterate(value).values()`.

### Array examples
```javascript
const test_array = [ 'foo', 'bar', 123 ];
for (const [ index, value ] of iterate(test_array)) {
  // 0, 'foo'
  // 1, 'bar'
  // 2, 123
}
for (const index of iterate(test_array).keys()) {
  // 0
  // 1
  // 2
}
```
(There is no need to iterate array values using `nano-iterator`.)

### Object examples
```javascript
const test_object = {
  foo: 'bar',
  baz: 123,
};
for (const [ key, value ] of iterate(test_object)) {
  // 'foo', 'bar'
  // 'baz', 123
}
for (const key of iterate(test_object).keys()) {
  // 'foo'
  // 'baz'
}
for (const value of iterate(test_object).values()) {
  // 'bar'
  // 123
}
```
