/**
 * @fileoverview Prefer native Array#map instead of lodash#map
 * @author WIVSW
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const isLodashCall = (node) => node.callee.object.name === '_';

const isMapCall = (node) => {
    const prop = node.callee.property;
    return prop &&
        prop.type === 'Identifier' &&
        prop.name === 'map'
};

const onFunctionCall = (node, context) => {
    const isLodashMapCall = isLodashCall(node) && isMapCall(node);

    if (!isLodashMapCall) {
        return;
    }
};


module.exports = {
    meta: {
        docs: {
            description: "Prefer native Array#map instead of lodash#map",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            // give me methods
            CallExpression: (node) => onFunctionCall(node, context),
        };
    }
};
