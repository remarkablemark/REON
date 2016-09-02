'use strict';

/**
 * Module dependencies.
 */
var objectToReact = require('./object-to-react');

/**
 * Convert the React element string to an object.
 *
 * @param  {String}       str       - The React element string.
 * @param  {Function}     [reviver] - The reviver function.
 * @return {ReactElement}           - The React element object.
 */
function parse(str, reviver) {
    if (typeof str !== 'string') {
        throw new Error('TypeError: First argument must be a string.');
    }

    try {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        var obj = JSON.parse(str, reviver);

        if (obj && obj.constructor === Object) {
            return objectToReact(obj);
        } else {
            throw new Error('Unable to parse string to valid React element.');
        }

    } catch (error) {
        throw error;
    }
}

/**
 * Export parse.
 */
module.exports = parse;
