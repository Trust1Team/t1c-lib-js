/**
 * @author Maarten Somers
 * @since 2018
 */

export { PolyfillChecker };

declare function require(name: string);

class PolyfillChecker {
    // utility to check browser compatibility with Promise, Array.from, Symbol

    public static browserCheck() {
        // check Promise
        let windowToCheck = window as any;
        if (!windowToCheck.Promise) {
            // not found, load promise polyfill (es6-promise)
            console.log('polyfilling Promise');
            require('es6-promise').polyfill();
        }

        // check Array.from
        if (!Array.from) {
            // not found, load array.from polyfill (core-js)
            console.log('polyfilling Array');
            require('core-js/es6/array');
            require('core-js/fn/array/from');
            require('core-js/fn/array/of');
            require('core-js/fn/array/is-array');
            require('core-js/fn/array/iterator');
            require('core-js/fn/array/copy-within');
            require('core-js/fn/array/fill');
            require('core-js/fn/array/find');
            require('core-js/fn/array/find-index');
            require('core-js/fn/array/values');
            require('core-js/fn/array/keys');
            require('core-js/fn/array/entries');
            require('core-js/fn/array/slice');
            require('core-js/fn/array/join');
            require('core-js/fn/array/index-of');
            require('core-js/fn/array/last-index-of');
            require('core-js/fn/array/every');
            require('core-js/fn/array/some');
            require('core-js/fn/array/for-each');
            require('core-js/fn/array/map');
            require('core-js/fn/array/filter');
            require('core-js/fn/array/reduce');
            require('core-js/fn/array/reduce-right');
            require('core-js/fn/array/sort');
            require('core-js/fn/array/virtual/iterator');
            require('core-js/fn/array/virtual/copy-within');
            require('core-js/fn/array/virtual/fill');
            require('core-js/fn/array/virtual/find');
            require('core-js/fn/array/virtual/find-index');
            require('core-js/fn/array/virtual/values');
            require('core-js/fn/array/virtual/keys');
            require('core-js/fn/array/virtual/entries');
            require('core-js/fn/array/virtual/slice');
            require('core-js/fn/array/virtual/join');
            require('core-js/fn/array/virtual/index-of');
            require('core-js/fn/array/virtual/last-index-of');
            require('core-js/fn/array/virtual/every');
            require('core-js/fn/array/virtual/some');
            require('core-js/fn/array/virtual/for-each');
            require('core-js/fn/array/virtual/map');
            require('core-js/fn/array/virtual/filter');
            require('core-js/fn/array/virtual/reduce');
            require('core-js/fn/array/virtual/reduce-right');
            require('core-js/fn/array/virtual/sort');
        }

        // check Symbol
        if (!windowToCheck.Symbol) {
            console.log('polyfilling Symbol');
            require('core-js/es6/symbol');
            require('core-js/fn/symbol');
            require('core-js/fn/symbol/has-instance');
            require('core-js/fn/symbol/is-concat-spreadable');
            require('core-js/fn/symbol/iterator');
            require('core-js/fn/symbol/match');
            require('core-js/fn/symbol/replace');
            require('core-js/fn/symbol/search');
            require('core-js/fn/symbol/species');
            require('core-js/fn/symbol/split');
            require('core-js/fn/symbol/to-primitive');
            require('core-js/fn/symbol/to-string-tag');
            require('core-js/fn/symbol/unscopables');
            require('core-js/fn/symbol/for');
            require('core-js/fn/symbol/key-for');
        }
    }
}
