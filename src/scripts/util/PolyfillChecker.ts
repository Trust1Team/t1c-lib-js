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
