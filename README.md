# REON [![NPM version](https://img.shields.io/npm/v/reon-core.svg)](https://www.npmjs.com/package/reon-core) [![Build Status](https://travis-ci.org/remarkablemark/REON.svg?branch=master)](https://travis-ci.org/remarkablemark/REON) [![Coverage Status](https://coveralls.io/repos/github/remarkablemark/REON/badge.svg)](https://coveralls.io/github/remarkablemark/REON)

[![NPM](https://nodei.co/npm/reon-core.png)](https://nodei.co/npm/reon-core/)

**REON** (React Element Object Notation) is a data-interchange format inspired by [React elements](https://facebook.github.io/react/docs/rendering-elements.html) and [JSON](http://www.json.org).

## Installation

```sh
# npm
npm install reon-core

# yarn
yarn add reon-core
```

## Usage

First import the module:
```js
// ES5
var REON = require('reon-core');

// ES6
import REON from 'reon-core';
```

### REON.stringify()

The `REON.stringify()` method converts a [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html) to a JSON string, optionally replacing values if a replacer function is specified.

**Syntax:**
```js
REON.stringify(ReactElement[, replacer]);
```

**Parameters:**
1. **ReactElement** (_required_): The [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html) to convert to a JSON string.
2. **replacer** (_optional_): A function that alters the behavior of the stringification process.

#### Examples:

Using `REON.stringify()`:
```js
REON.stringify(
  React.createElement('p', { className: 'classy' }, 'text')
);
// '{"type":"p","props":{"className":"classy","children":"text"}}'
```

Using the `replacer` parameter:
```js
REON.stringify(
  React.createElement('p', { className: 'classy' }, 'text'),
  function(key, value) {
    // passing in a replacer parameter will override the default replacer,
    // which removes object keys like `ref`, `_owner`, `_store`
    if (/^ref$|^_.+/.test(key)) return;

    if (value === 'classy') {
      return 'sophisticated'; // return replaced value
    }
    return value; // return everything else unchanged
  }
);
// '{"type":"p","props":{"className":"sophisticated","children":"text"}}'
```

### REON.parse()

The `REON.parse()` method parses a string as [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html), optionally transforming the value producted by parsing.

**Syntax:**
```js
REON.parse(text[, reviver]);
```

**Parameters:**
1. **text** (_required_): The string to parse as [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html).
2. **reviver** (_optional_): A function that prescribes how the value originally produced by parsing is transformed, before being returned.

#### Examples:

Using `REON.parse()`:
```js
REON.parse(
  '{"type":"p","props":{"className":"classy","children":"text"}}'
);
// React.createElement('p', { className: 'classy' }, 'text');
```

Using the `reviver` parameter:
```js
REON.parse(
  '{"type":"a","props":{"href":"http://foo.bar","children":"link"}}',
  function(key, value) {
    if (key === 'href' && value === 'http://foo.bar') {
      return 'http://baz.qux'; // return different href
    }
    return value; // return everything else unchanged
  }
);
// React.createElement('a', { href: 'http://baz.qux' }, 'link');
```

### REON.parseObject()

The `REON.parseObject()` method converts a JavaScript object into [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html).

**Syntax:**
```js
REON.parseObject(object);
```

**Parameters:**
1. **object** (_required_): The object to convert into [ReactElement](https://facebook.github.io/react/docs/rendering-elements.html).

#### Examples:

Using `REON.parseObject()`:
```js
REON.parseObject({
  type: 'p',
  props: {
    className: 'classy',
    children: 'text'
  }
});
// React.createElement('p', { className: 'classy' }, 'text');
```

## Testing

```sh
# npm
npm test
npm run lint

# yarn
yarn test
yarn run lint
```

## Thanks

To all the [contributors](https://github.com/remarkablemark/REON/graphs/contributors).

## License

[MIT](LICENSE)
