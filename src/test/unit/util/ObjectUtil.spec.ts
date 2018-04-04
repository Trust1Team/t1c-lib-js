/**
 * @author Maarten Somers
 * @since 2018
 */

import { expect } from 'chai';

import { ObjectUtil } from '../../../scripts/util/ObjectUtil';

describe('Object Utility', () => {

    describe('strips object of empty/unused/undefined properties', function () {

        it('removes undefined properties', () => {
            let object = { test: 'a', empty: undefined };
            expect(object).to.have.property('test');
            expect(object).to.have.property('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).to.have.property('test').eq('a');
            expect(object).to.not.have.property('empty');
        });

        it('removes null properties', () => {
            let object = { test: 'a', empty: null };
            expect(object).to.have.property('test');
            expect(object).to.have.property('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).to.have.property('test').eq('a');
            expect(object).to.not.have.property('empty');
        });

        it('removes empty properties', () => {
            let object = { test: 'a', empty: '' };
            expect(object).to.have.property('test');
            expect(object).to.have.property('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).to.have.property('test').eq('a');
            expect(object).to.not.have.property('empty');
        });

        it('removes other falsy properties', () => {
            let object = { test: 'a', empty: false };
            expect(object).to.have.property('test');
            expect(object).to.have.property('empty');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).to.have.property('test').eq('a');
            expect(object).to.not.have.property('empty');
        });

        it('does nothing for other container types', () => {
            let object = { test: 'a', second: 3, bool: true };
            expect(object).to.have.property('test');
            expect(object).to.have.property('second');
            expect(object).to.have.property('bool');

            ObjectUtil.removeNullAndUndefinedFields(object);
            expect(object).to.have.property('test').eq('a');
            expect(object).to.have.property('second').eq(3);
            expect(object).to.have.property('bool').eq(true);
        });
    });
});
