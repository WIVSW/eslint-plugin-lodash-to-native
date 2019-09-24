/**
 * @fileoverview Prefer native Array#map instead of lodash#map
 * @author WIVSW
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({parserOptions: { ecmaVersion: 2015 }});
ruleTester.run("map", rule, {

    valid: [

        // give me some code that won't trigger a warning
        {
            code: 'var asdf = [].map(a => a);',
        },
        {
            code: '_.map({a: 1, b: 2}, fn)',
        }
    ],

    invalid: [
        {
            code: "_.map([], (a) => a)",
            output: '[].map((a) => a)',
            errors: [{
                messageId: 'prefer'
            }]
        },
        {
            code: "_.map([ 1, 2, 3 ], (a) => a);",
            output: '[ 1, 2, 3 ].map((a) => a);',
            errors: [{
                messageId: 'prefer'
            }]
        },
        {
            code: '_.map(collection, (a) => a)',
            output: 'collection instanceof Array ? collection.map((a) => a) : _.map(collection, (a) => a)',
            errors: [{
                messageId: 'prefer'
            }]
        }
    ]
});
