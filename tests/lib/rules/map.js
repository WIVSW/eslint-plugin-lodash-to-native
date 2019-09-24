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
            code: "var asdf = [].map(a => a);",
        }
    ],

    invalid: [
        {
            code: "_.map([], (a) => a)",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
