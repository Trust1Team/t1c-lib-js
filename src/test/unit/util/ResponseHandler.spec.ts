import { ResponseHandler } from "../../../scripts/util/ResponseHandler";


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('ResponseHandler Utility', () => {

    describe(':: Error handler', function () {
        test('calls the callback function if provided', () => {
            return ResponseHandler.error({ status: 400, code: '402', description: 'Invalid Arguments'}).then(() => {
            }, err => {
                expect(err).toHaveProperty('description');
                expect(err).toHaveProperty('status');
                expect(err).toHaveProperty('code');
                expect(err.code).toEqual('402');
                expect(err.status).toEqual(400);
                expect(err.description).toEqual('Invalid Arguments');
            });
        });
    });


    describe(':: Response handler', function () {
        test('calls the callback function if provided', () => {
            return ResponseHandler.response({ success: true, data: 'some data'}).then(res => {
                expect(res).toHaveProperty('success');
                expect(res).toHaveProperty('data');
                expect(res.success).toEqual(true);
                expect(res.data).toEqual('some data');
            }, () => {
            });
        });
    });

});
