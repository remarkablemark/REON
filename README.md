# REON

REON (React Element Object Notation) is a data-interchange format inspired by [React elements](https://facebook.github.io/react/docs/glossary.html#react-elements) and [JSON](http://www.json.org).

## Installation

```sh
$ npm install reon-core
```

## Usage

To use **REON**, you must first import the module.

```js
var REON = require('reon-core');
```

### REON.stringify()

The `REON.stringify()` method converts a [ReactElement](https://facebook.github.io/react/docs/glossary.html#react-elements) to a JSON string, optionally replacing values if a replacer function is specified.

Syntax:
```js
REON.stringify(ReactElement[, replacer]);
```

Parameters:
1. **ReactElement** (_required_): The [ReactElement](https://facebook.github.io/react/docs/glossary.html#react-elements) to convert to a JSON string.
2. **replacer** (_optional_): A function that alters the behavior of the stringification process.

#### Examples:

Using `JSON.stringify()`:
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

## Testing

```sh
$ npm test
$ npm run lint
```

## License

MIT
