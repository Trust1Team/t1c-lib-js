export class Polyfills {
    static check() {
        let windowToCheck = window;
        if (!windowToCheck.Promise) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Promise');
            require('es6-promise').polyfill();
        }
        if (!Array.from) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Array');
            require('core-js/es6/array');
            require('core-js/es6/typed');
        }
        if (!windowToCheck.Symbol) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Symbol');
            require('core-js/es6/symbol');
        }
        if (typeof Object.assign !== 'function') {
            console.log('T1C-JS Lib: applying polyfill for ES6 Object Assign');
            require('es6-object-assign').polyfill();
        }
        if (!String.prototype.startsWith) {
            console.log('T1C-JS Lib: applying polyfill for IE11 String.startsWith');
            String.prototype.startsWith = function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
            };
        }
        if (!String.prototype.endsWith) {
            console.log('T1C-JS Lib: applying polyfill for IE11 String.endsWith');
            String.prototype.endsWith = function (search, this_len) {
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
    }
}
//# sourceMappingURL=Polyfills.js.map