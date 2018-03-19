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
            require('core-js/es6/date');
            require('core-js/es6/function');
            require('core-js/es6/index');
            require('core-js/es6/map');
            require('core-js/es6/math');
            require('core-js/es6/number');
            require('core-js/es6/object');
            require('core-js/es6/parse-float');
            require('core-js/es6/parse-int');
            require('core-js/es6/reflect');
            require('core-js/es6/regexp');
            require('core-js/es6/set');
            require('core-js/es6/string');
            require('core-js/es6/typed');
            require('core-js/es6/weak-map');
            require('core-js/es6/weak-set');
        }

        // check Symbol
        if (!windowToCheck.Symbol) {
            console.log('polyfilling Symbol');
            require('core-js/es6/symbol');
        }
    }
}
