import { ObjectUtil } from './../../../scripts/util/ObjectUtil';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('Object Utility', () => {

    describe('strips object of empty/unused/undefined properties', function () {

        test('removes undefined properties', () => {
            let object = { test: 'a', empty: undefined };
            expect(object).toHaveProperty('test');
            expect(object).toHaveProperty('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).toHaveProperty('test', 'a');
            expect(object).not.toHaveProperty('empty');
        });

        test('removes null properties', () => {
            let object = { test: 'a', empty: null };
            expect(object).toHaveProperty('test');
            expect(object).toHaveProperty('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).toHaveProperty('test', 'a');
            expect(object).not.toHaveProperty('empty');
        });

        test('removes empty properties', () => {
            let object = { test: 'a', empty: '' };
            expect(object).toHaveProperty('test');
            expect(object).toHaveProperty('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).toHaveProperty('test', 'a');
            expect(object).not.toHaveProperty('empty');
        });

        test('removes other falsy properties', () => {
            let object = { test: 'a', empty: false };
            expect(object).toHaveProperty('test');
            expect(object).toHaveProperty('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).toHaveProperty('test', 'a');
            expect(object).not.toHaveProperty('empty');
        });

        test('does nothing for other container types', () => {
            let object = { test: 'a', second: 3, bool: true };
            expect(object).toHaveProperty('test');
            expect(object).toHaveProperty('second');
            expect(object).toHaveProperty('bool');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).toHaveProperty('test', 'a')
            expect(object).toHaveProperty('second', 3);
            expect(object).toHaveProperty('bool', true);
        });
    });
});
