/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect, assert } from 'chai';
import {ResponseHandler} from '../../..';
import sinon = require('../../../../node_modules/@types/sinon');


describe('ResponseHandler Utility', () => {

    describe(':: Error handler', function () {
        it('calls the callback function if provided', () => {
            let callback = sinon.spy();
            return ResponseHandler.error({ status: 400, code: '402', description: 'Invalid Arguments'}, callback).then(() => {
                expect.fail(0, 1, 'Error handler should return rejected promise');
            }, err => {
                assert(callback.called, 'Callback function not called.');
                expect(err).to.be.an('object');
                expect(err).to.have.property('description');
                expect(err).to.have.property('status');
                expect(err).to.have.property('code');
                expect(err.code).to.be.a('string').eq('402');
                expect(err.status).to.be.a('number').eq(400);
                expect(err.description).to.be.a('string').eq('Invalid Arguments');
            });
        });
    });


    describe(':: Response handler', function () {
        it('calls the callback function if provided', () => {
            let callback = sinon.spy();
            return ResponseHandler.response({ success: true, data: 'some data'}, callback).then(res => {
                assert(callback.called, 'Callback function not called.');
                expect(res).to.be.an('object');
                expect(res).to.have.property('success');
                expect(res).to.have.property('data');
                expect(res.success).to.be.a('boolean').eq(true);
                expect(res.data).to.be.a('string').eq('some data');
            }, () => {
                expect.fail(0, 1, 'Response handler should return resolved promise');
            });
        });
    });

});
