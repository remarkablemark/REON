'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Convert the React element object to a string.
 *
 * @param  {ReactElement} obj - The React element object.
 * @return {String}           - The React element string.
 */
function stringify(obj) {
    if (!React.isValidElement(obj)) {
        throw new Error(obj, 'is not a valid React element.');
    }
    return JSON.stringify(obj);
}

/**
 * Export stringify.
 */
module.exports = stringify;
