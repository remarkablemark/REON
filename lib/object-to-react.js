'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Convert an object to React element(s).
 *
 * The object schema should be similar to React element's.
 * Note: The object passed in this function will be mutated.
 *
 * @param  {Object}       obj - The element object.
 * @return {ReactElement}
 */
function objectToReactElement(obj) {
    var args = [];
    var children;

    // `React.createElement` 1st argument: type
    args[0] = obj.type;

    // `props` should always be defined
    // it can be an empty object or contain the React props and/or children
    if (obj.props) {

        // save reference to `children` and remove `children` from `props`
        // as it shouldn't be passed as a prop in `React.createElement`
        if (obj.props.children) {
            children = obj.props.children;
            obj.props.children = null; // more performant than `delete`
        }

        // set `key` in `prop`
        if (obj.key !== undefined && obj.key !== null) {
            obj.props.key = obj.key;
        }

        // `React.createElement` 2nd argument: props
        args[1] = obj.props;
    }

    // `props.children`
    if (children) {
        // third argument: children (mixed values)
        switch (children.constructor) {
            // text
            case String:
                args[2] = children;
                break;
            // React element
            case Object:
                args[2] = objectToReactElement(children);
                break;
            // array (mixed values)
            case Array:
                // to be safe (although this should never happen)
                if (args[1] === undefined) {
                    args[1] = null;
                }
                args = args.concat(arrayToReactChildren(children));
                break;
            default:
                // pass
        }
    }

    return React.createElement.apply({}, args);
}

/**
 * Convert an array of items to React children.
 *
 * @param  {Array} arr - The array.
 * @return {Array}     - The array of mixed values.
 */
function arrayToReactChildren(arr) {
    // similar to `props.children`
    var result = [];
    // child of `props.children`
    var item;

    // iterate through the `children`
    for (var i = 0, len = arr.length; i < len; i++) {
        // child can have mixed values: text, React element, or array
        item = arr[i];
        switch (item.constructor) {
            // text node
            case String:
                result.push(item);
                break;
            // React element
            case Object:
                result.push(objectToReactElement(item));
                break;
            // array (mixed values)
            case Array:
                result.push(arrayToReactChildren(item));
                break;
            default:
                // pass
        }
    }

    return result;
}

/**
 * Export object to React element converter.
 */
module.exports = objectToReactElement;
