/**
 * @fileoverview Prefer native Array#map instead of lodash#map
 * @author WIVSW
 */
'use strict';

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

const getCallType = (node) => node.arguments[0] && node.arguments[0].type || null;

const isUsedWithObject = (node) => getCallType(node) === 'ObjectExpression';

const isUsedWithArray = (node) => getCallType(node) === 'ArrayExpression';

const replaceCodeWithArray = (fixer, node, context) => {
    const source = context.getSourceCode();
    const args = node.arguments.map(a => source.getText(a));
    return fixer.replaceText(node, `${source.getText(node.arguments[0])}.map(${args.slice(1).join(', ')})`);
};

const onFunctionCall = (node, context) => {
    const isLodashMapCall = isLodashCall(node) && isMapCall(node);

    if (!isLodashMapCall) {
        return;
    }

    if (!node.arguments.length) {
        return;
    }

    if (isUsedWithObject(node)) {
        return;
    }

    if (isUsedWithArray(node)) {
        context.report({
            node,
            messageId: 'prefer',
            fix: (fixer) => replaceCodeWithArray(fixer, node, context)
        });
        return;
    }

};


module.exports = {
    meta: {
        docs: {
            description: 'Prefer native Array#map instead of lodash#map',
            category: 'Fill me in',
            recommended: false
        },
        fixable: 'code',  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
            prefer: "Prefer native Array#map instead of lodash#map"
        }
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
            CallExpression: (node) => onFunctionCall(node, context)
        };
    }
};
