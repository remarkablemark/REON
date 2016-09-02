'use strict';

/**
 * Module dependencies.
 */
var objectToReact = require('./object-to-react');

/**
 * Convert the React element string to an object.
 *
 * @param  {String}       str - The React element string.
 * @return {ReactElement}     - The React element object.
 */
function parse(str) {
    if (typeof str !== 'string') {
        throw new Error('TypeError: First argument must be a string.');
    }

    try {
        var obj = JSON.parse(str);
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
