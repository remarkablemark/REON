'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Convert the React element object to a string.
 *
 * @param  {ReactElement} obj        - The React element object.
 * @param  {Function}     [replacer] - The replacer function.
 * @return {String}                  - The React element string.
 */
function stringify(obj, replacer) {
    if (!React.isValidElement(obj)) {
        throw new Error('TypeError: First argument must be a valid React element.');
    }

    // default replacer
    if (typeof replacer !== 'function') {
        replacer = function(key, value) {
            // remove `key`, `_owner`, `_store`
            if (/^ref$|^_.+/.test(key)) return;

            // remove `key` when it is `null` (optimization)
            if (key === 'key' && value === null) return;

            return value;
        };
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    return JSON.stringify(obj, replacer);
}

/**
 * Export stringify.
 */
module.exports = stringify;
