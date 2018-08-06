import { CardUtil } from './../../../scripts/util/CardUtil';
import { SmartCard } from "../../../scripts/core/service/CoreModel";

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('Card Utility', () => {
    let card: SmartCard;

    describe('can determine the correct container to use for a given card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can recognize a known card', () => {
            let container = CardUtil.determineContainer(card);
            expect(container).toEqual('beid');
        });

        test('returns undefined for an unknown card', () => {
            let container = CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] });
            expect(container).toBeUndefined();
        });
    });


    describe('can determine if a card can be used to authenticate', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let container = CardUtil.canAuthenticate(card);
            expect(container).toEqual(true);
        });

        test('returns false for an unknown card', () => {
            let container = CardUtil.canAuthenticate({ atr: '000', description: [ 'an unknown card'] });
            expect(container).toEqual(false);
        });
    });


    describe('can determine if a card can be used to sign', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let container = CardUtil.canSign(card);
            expect(container).toEqual(true);
        });

        test('returns false for an unknown card', () => {
            let container = CardUtil.canSign({ atr: '000', description: [ 'an unknown card'] });
            expect(container).toEqual(false);
        });
    });


    describe('can determine if a card can be used to verify the PIN', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let container = CardUtil.canVerifyPin(card);
            expect(container).toEqual(true);
        });

        test('returns false for an unknown card', () => {
            let container = CardUtil.canVerifyPin({ atr: '000', description: [ 'an unknown card'] });
            expect(container).toEqual(false);
        });
    });


    describe('can determine the default signing algorithm to use for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let algo = CardUtil.defaultAlgo(CardUtil.determineContainer(card));
            expect(algo).toEqual('sha256');
        });

        test('returns undefined for an unknown card', () => {
            let algo = CardUtil.defaultAlgo(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(algo).toBeUndefined();
        });
    });


    describe('can determine the dump method for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let dumpMethod = CardUtil.dumpMethod(CardUtil.determineContainer(card));
            expect(dumpMethod).toEqual('allData');
        });

        test('returns undefined for an unknown card', () => {
            let dumpMethod = CardUtil.dumpMethod(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(dumpMethod).toBeUndefined();
        });
    });


    describe('can determine the dump method options for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        test('can check for a known card', () => {
            let dumpOptions = CardUtil.dumpOptions(CardUtil.determineContainer(card));
            expect(dumpOptions).toHaveProperty('filters');

            expect(dumpOptions).toHaveProperty('parseCerts');
        });

        test('returns undefined for an unknown card', () => {
            let dumpOptions = CardUtil.dumpOptions(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(dumpOptions).toBeUndefined();
        });
    });

});
