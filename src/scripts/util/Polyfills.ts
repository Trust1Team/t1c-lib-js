/**
 * @author Maarten Somers
 * @since 2018
 */


declare function require(name: string);
export class Polyfills {
    // utility to check browser compatibility with Promise, Array.from, Symbol

    public static check() {
        // check Promise
        let windowToCheck = window as any;
        if (!windowToCheck.Promise) {
            // not found, load promise polyfill (es6-promise)
            console.log('T1C-JS Lib: applying polyfill for ES6 Promise');
            require('es6-promise').polyfill();
        }

        // check Array.from
        if (!Array.from) {
            // not found, load array.from polyfill (core-js)
            console.log('T1C-JS Lib: applying polyfill for ES6 Array');
            require('core-js/es6/array');
            require('core-js/es6/typed');
        }

        // check Symbol
        if (!windowToCheck.Symbol) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Symbol');
            require('core-js/es6/symbol');
        }

        if (typeof Object.assign !== 'function') {
            console.log('T1C-JS Lib: applying polyfill for object assign');
            require('object-assign');
        }
    }
}
