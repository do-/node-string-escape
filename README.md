![workflow](https://github.com/do-/node-string-escape-map/actions/workflows/main.yml/badge.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

# node-string-escape-map
Escape a given map of special characters

# Installation
```sh
npm install string-escape-map
```

# Usage
```js
const stringEscape = require ('string-escape-map')

// initialization
const MY_ESC = new stringEscape ([
  ['\t', '\\t'],
  ['\n', '\\n'],
  [ "'", "''"],
])

// possible later adjustment
MY_ESC.set ('\r', '')

// run time usage
const unsafeString = `Don't
you?`

const safeString = MY_ESC.escape (unsafeString)
```
# Details
## Constructor 

The class provided by `string-escape-map` is derived from [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and shares its [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) argument format: if set, it must be an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) of key-value pairs.

Additional restrictions on input are same as for the `set` method (see below).

## Methods
### `set`

The standard [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) method is overloaded to effectively store char codes to safe substring mapping. So:

* `key` and `value` must be (primitive) `string`s;
* `key` must be a single character string. 

Under the hood, the `key` parameter is subject to [charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt).

Other than registering a map entry, it sets `escape1` or `escapeN` as `this.escape` method.

## `escape`

This method executes the module's main task: replaces all the characters in question with their safe representations

```js
const safeString = MY_ESC.escape (unsafeString)
```

### Parameter

`unsafeString` must be a primitive [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). 

`null`, `undefined` etc. values cause errors.

Zero length strings are allowed.

### Return value

A primitive string with all occurrences of each character previously `set` replaced with corresponding substrings.

## `escapeN`

This method is used as `escape` in case when more than one entry is set in this map. It scans through `unsafeString`, detect unsafe chars with `charCodeAt` and concatenates the result from safe `slice`s glued with replacement strings from this Map.

## `escape1`

This method is used as `escape` when only one unsafe character is known, so this works as `replaceAll`. The `unsafeString` is scanned with `indexOf`, the result is assembled from the `slice`s detected.

# Implementation notes

No [replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) nor [replaceAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) method is used.

No [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) is constructed.

The given string is scanned with [charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) (which is significantly faster and more memory efficient than [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)).

If no unsafe character is ever found, the argument is passed through untouched, without creating any temporary object at all.

Otherwise, the resulting string is created by concatenating complete safe [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)s with replacement substrings for unsafe chars.
