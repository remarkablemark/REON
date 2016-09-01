'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var objectToReact = require('../lib/object-to-react');

/**
 * Helpers.
 */
describe('helpers', function() {

    describe('#objectToReactElement', function() {

        it('converts object to a React element', function() {
            assert(
                React.isValidElement(
                    objectToReact({ type: 'meta' })
                )
            );
        });

        it('converts object with text as children', function() {
            assert.deepEqual(
                objectToReact({
                    type: 'div',
                    props: { children: 'text' }
                }),
                React.createElement('div', {}, 'text')
            );
        });

        it('converts object with React element as children', function() {
            assert.deepEqual(
                objectToReact({
                    type: 'div',
                    props: { children: { type: 'p' } }
                }),
                React.createElement('div', {}, React.createElement('p'))
            );
        });

        it('converts object with array as children', function() {
            assert.deepEqual(
                objectToReact({
                    type: 'body',
                    props: { children: ['text', {
                        type: 'section',
                        props: { children: 'more text' }
                    }] }
                }),
                React.createElement(
                    'body', {}, 'text',
                    React.createElement('section', {}, 'more text')
                )
            );
        });

        it('converts object with mixed array as children', function() {
            assert.deepEqual(
                objectToReact({
                    type: 'html',
                    props: { children: [
                        'text',
                        { type: 'section' },
                        [ 'foo' ]
                    ] }
                }),
                React.createElement(
                    'html', {}, 'text',
                    React.createElement('section'), ['foo']
                )
            );
        });

        it('preserves the props when converting', function() {
            assert.deepEqual(
                objectToReact({
                    type: 'html',
                    props: { lang: 'en' }
                }),
                React.createElement('html', { lang: 'en' })
            );
        });

    });

});
