# Prefer native Array#map instead of lodash#map (map)

## Rule Details

This rule aims to disallow lodash map method applied to array

Examples of **incorrect** code for this rule:

```js

[].map(a => a);

```

Examples of **correct** code for this rule:

```js

_.map([], (a) => a)

```
