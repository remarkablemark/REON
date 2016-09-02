'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var REON = require('../index');

/**
 * REON methods.
 */
describe('REON', function() {

    /**
     * Stringify.
     */
    describe('#stringify', function() {

        it('throws an error if argument is invalid', function() {
            var values = [undefined, null, {}, [],'foo', 42, { type: 'div' }];
            values.forEach(function(value) {
                assert.throws(function() { REON.stringify(value); });
            });
        });

        it('converts simple React element to string', function() {
            assert.deepEqual(
                REON.stringify(
                    React.createElement('meta')
                ),
                JSON.stringify({
                    type: 'meta',
                    props: {}
                })
            );
        });

        it('converts complex React element to string', function() {
            assert.deepEqual(
                REON.stringify(
                    React.createElement('div', { className: 'foo' }, 'text')
                ),
                JSON.stringify({
                    type: 'div',
                    props: {
                        className: 'foo',
                        children: 'text'
                    }
                })
            );
        });

        it('transforms the results with `replacer` parameter', function() {
            assert.deepEqual(
                REON.stringify(
                    React.createElement('head'),
                    function(key, value) {
                        if (value.type === 'head') {
                            return { type: 'body' };
                        }
                        return value;
                    }
                ),
                JSON.stringify({ type: 'body' })
            );
        });

    });

    /**
     * Parse.
     */
    describe('#parse', function() {

        it('throws an error if argument is invalid', function() {
            var values = [
                undefined, null, {}, [], 42, { type: null },
                '""', 'null', '42', 'foo', '"foo"'
            ];
            values.forEach(function(value) {
                assert.throws(function() { REON.parse(value); });
            });
        });

        it('converts a valid string to React elements', function() {
            var parsed = REON.parse(
                JSON.stringify({
                    type: 'div',
                    props: {
                        className: 'foo',
                        children: 'text'
                    }
                })
            );

            assert(React.isValidElement(parsed));
            assert.deepEqual(
                parsed,
                React.createElement('div', {
                    className: 'foo'
                }, 'text')
            );
        });

        it('converts a complex string to React elements', function() {
            var parsed = REON.parse(
                JSON.stringify({
                    type: 'div',
                    key: null,
                    props: {
                        foo: 'foo',
                        children: [
                            {
                                type: 'p',
                                key: 1,
                                props: { children: 'bar' }
                            },
                            ['baz'],
                            'text'
                        ]
                    }
                })
            );

            assert(React.isValidElement(parsed));
            assert.deepEqual(
                parsed,
                React.createElement('div', { foo: 'foo' },
                    React.createElement('p', { key: 1 }, 'bar'),
                    ['baz'], 'text'
                )
            );
        });

        it('converts stringified React element back to valid React element', function() {
            var reactElement = React.createElement('body', {},
                React.createElement('h1', { style: { color: '#f00' } }, 'foo'),
                'bar',
                React.createElement('ul', {},
                    React.createElement('li', {}, 'one'),
                    React.createElement('li', {}, 'two')
                )
            );
            var parsed = REON.parse(
                REON.stringify(reactElement)
            );

            assert(React.isValidElement(parsed));
            assert.deepEqual(
                REON.parse(
                    REON.stringify(reactElement)
                ),
                reactElement
            );
        });

        it('transforms the results with `reviver` parameter', function() {
            var reactElement = React.createElement('a', {
                href: 'http://foo.bar'
            }, 'link');

            assert.deepEqual(
                REON.parse(
                    REON.stringify(reactElement),
                    function(key, value) {
                        if (key === 'href') {
                            return 'http://baz.qux';
                        }
                        return value;
                    }
                ),
                React.cloneElement(reactElement, { href: 'http://baz.qux' })
            );
        });

    });

});
