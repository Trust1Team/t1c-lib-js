import { RequestHandler, Options } from './../../../scripts/util/RequestHandler';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('RequestHandler Utility', () => {

    describe('can determine the correct options/callback to use', function () {
        let callback: any;
        let optionsObject: { parseCerts: boolean };

        beforeEach(() => {
            callback = () => {/* no-op */ };
            optionsObject = { parseCerts: true };
        });

        test('and can recognize a callback function as first parameter', () => {
            let options = RequestHandler.determineOptions(callback, undefined);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(false);
            expect(options).toHaveProperty('callback');
            expect(options.callback).toEqual(callback);
        });

        test('and can handle the omission of the first parameter', () => {
            let options = RequestHandler.determineOptions(undefined, callback);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(false);
            expect(options).toHaveProperty('callback');
            expect(options.callback).toEqual(callback);
        });

        test('and can handle the omission of a callback function', () => {
            let options = RequestHandler.determineOptions(optionsObject, undefined);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(true);
            expect(options).toHaveProperty('callback');
            expect(options.callback).toBeUndefined();
        });

        test('and can handle inclusion of both parameters', () => {
            let options = RequestHandler.determineOptions(optionsObject, callback);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(true);
            expect(options).toHaveProperty('callback');
            expect(options.callback).toEqual(callback);
        });
    });


    describe('can determine the correct options/callback to use for a request with filter', function () {
        let optionsObject: Options;

        beforeEach(() => {
            optionsObject = new Options(true, ['filter1', 'filter2']);
        });

        test('and can recognize an array of filters', () => {
            let options = RequestHandler.determineOptionsWithFilter(optionsObject.filters);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(false);
            expect(options).toHaveProperty('params');
            expect(options.params).toHaveProperty('filter');
        });

        test('and can recognize an options object', () => {
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(true);
            expect(options).toHaveProperty('params');
            expect(options.params).toHaveProperty('filter');
        });

        test('and assumes parsing certificates to be false when not provided', () => {
            delete optionsObject.parseCerts;
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(false);
            expect(options).toHaveProperty('params');
            expect(options.params).toHaveProperty('filter');
        });

        test('and omits the filters if not provided', () => {
            delete optionsObject.filters;
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).toHaveProperty('parseCerts');
            expect(options.parseCerts).toEqual(true);
            expect(options).toHaveProperty('params');
            expect(options.params).not.toHaveProperty('filter');
        });
    });
});
