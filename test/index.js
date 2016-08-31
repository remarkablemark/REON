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

        it('converts React element object to string', function() {
            assert.deepEqual(
                REON.stringify(React.createElement('div', {
                    className: 'foo'
                }, 'text')),
                JSON.stringify({
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                        className: 'foo',
                        children: 'text'
                    },
                    _owner: null,
                    _store: {}
                })
            );
        });

    });

});
