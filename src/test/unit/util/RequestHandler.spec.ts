/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import { Options, RequestHandler } from '../../../scripts/util/RequestHandler';

describe('RequestHandler Utility', () => {

    describe('can determine the correct options/callback to use', function () {
        let callback: any;
        let optionsObject: { parseCerts: boolean };

        beforeEach(() => {
            callback = () => {/* no-op */ };
            optionsObject = { parseCerts: true };
        });

        it('and can recognize a callback function as first parameter', () => {
            let options = RequestHandler.determineOptions(callback, undefined);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(false);
            expect(options).to.have.property('callback');
            expect(options.callback).to.be.a('function');
            expect(options.callback).to.eq(callback);
        });

        it('and can handle the omission of the first parameter', () => {
            let options = RequestHandler.determineOptions(undefined, callback);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(false);
            expect(options).to.have.property('callback');
            expect(options.callback).to.be.a('function');
            expect(options.callback).to.eq(callback);
        });

        it('and can handle the omission of a callback function', () => {
            let options = RequestHandler.determineOptions(optionsObject, undefined);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(true);
            expect(options).to.have.property('callback');
            expect(options.callback).to.be.undefined;
        });

        it('and can handle inclusion of both parameters', () => {
            let options = RequestHandler.determineOptions(optionsObject, callback);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(true);
            expect(options).to.have.property('callback');
            expect(options.callback).to.be.a('function');
            expect(options.callback).to.eq(callback);
        });
    });


    describe('can determine the correct options/callback to use for a request with filter', function () {
        let optionsObject: Options;

        beforeEach(() => {
            optionsObject = new Options(true, ['filter1', 'filter2']);
        });

        it('and can recognize an array of filters', () => {
            let options = RequestHandler.determineOptionsWithFilter(optionsObject.filters);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(false);
            expect(options).to.have.property('params');
            expect(options.params).to.have.property('filter');
            expect(options.params.filter).to.be.a('string').eq('filter1,filter2');
        });

        it('and can recognize an options object', () => {
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(true);
            expect(options).to.have.property('params');
            expect(options.params).to.have.property('filter');
            expect(options.params.filter).to.be.a('string').eq('filter1,filter2');
        });

        it('and assumes parsing certificates to be false when not provided', () => {
            delete optionsObject.parseCerts;
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(false);
            expect(options).to.have.property('params');
            expect(options.params).to.have.property('filter');
            expect(options.params.filter).to.be.a('string').eq('filter1,filter2');
        });

        it('and omits the filters if not provided', () => {
            delete optionsObject.filters;
            let options = RequestHandler.determineOptionsWithFilter(optionsObject);
            expect(options).to.be.an('object');
            expect(options).to.have.property('parseCerts');
            expect(options.parseCerts).to.eq(true);
            expect(options).to.have.property('params');
            expect(options.params).to.not.have.property('filter');
        });
    });

});
