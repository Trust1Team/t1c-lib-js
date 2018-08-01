/**
 * @author Maarten Somers
 * @since 2017
 */
import {CardUtil, SmartCard} from '../../..';
import { expect } from 'chai';


describe('Card Utility', () => {
    let card: SmartCard;

    describe('can determine the correct container to use for a given card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can recognize a known card', () => {
            let container = CardUtil.determineContainer(card);
            expect(container).to.be.a('string');
            expect(container, 'Expected card to be recognized').to.eq('beid');
        });

        it('returns undefined for an unknown card', () => {
            let container = CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] });
            expect(container, 'An unknown card should return undefined').to.be.undefined;
        });
    });


    describe('can determine if a card can be used to authenticate', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let container = CardUtil.canAuthenticate(card);
            expect(container).to.be.a('boolean');
            expect(container, 'Expected card to be able to authenticate').to.eq(true);
        });

        it('returns false for an unknown card', () => {
            let container = CardUtil.canAuthenticate({ atr: '000', description: [ 'an unknown card'] });
            expect(container).to.be.a('boolean');
            expect(container, 'An unknown card should return false').to.eq(false);
        });
    });


    describe('can determine if a card can be used to sign', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let container = CardUtil.canSign(card);
            expect(container).to.be.a('boolean');
            expect(container, 'Expected card to be able to sign').to.eq(true);
        });

        it('returns false for an unknown card', () => {
            let container = CardUtil.canSign({ atr: '000', description: [ 'an unknown card'] });
            expect(container).to.be.a('boolean');
            expect(container, 'An unknown card should return false').to.eq(false);
        });
    });


    describe('can determine if a card can be used to verify the PIN', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let container = CardUtil.canVerifyPin(card);
            expect(container).to.be.a('boolean');
            expect(container, 'Expected card to be able to verify pin').to.eq(true);
        });

        it('returns false for an unknown card', () => {
            let container = CardUtil.canVerifyPin({ atr: '000', description: [ 'an unknown card'] });
            expect(container).to.be.a('boolean');
            expect(container, 'An unknown card should return false').to.eq(false);
        });
    });


    describe('can determine the default signing algorithm to use for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let algo = CardUtil.defaultAlgo(CardUtil.determineContainer(card));
            expect(algo).to.be.a('string');
            expect(algo, 'Expected default algorithm to equal SHA256').to.eq('sha256');
        });

        it('returns undefined for an unknown card', () => {
            let algo = CardUtil.defaultAlgo(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(algo, 'An unknown card should return undefined').to.be.undefined;
        });
    });


    describe('can determine the dump method for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let dumpMethod = CardUtil.dumpMethod(CardUtil.determineContainer(card));
            expect(dumpMethod).to.be.a('string');
            expect(dumpMethod, 'Expected dump method to equal allData').to.eq('allData');
        });

        it('returns undefined for an unknown card', () => {
            let dumpMethod = CardUtil.dumpMethod(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(dumpMethod, 'An unknown card should return undefined').to.be.undefined;
        });
    });


    describe('can determine the dump method options for a card', function () {
        beforeEach(() => {
            card = { atr: '1234567890', description: [ 'Belgium Electronic ID card'] };
        });

        it('can check for a known card', () => {
            let dumpOptions = CardUtil.dumpOptions(CardUtil.determineContainer(card));
            expect(dumpOptions).to.be.an('object');
            expect(dumpOptions, 'Expected dump method options to have a filters field').to.have.property('filters');
            expect(dumpOptions.filters).to.be.an('array').of.length(0);

            expect(dumpOptions, 'Expected dump method options to have a parseCerts field').to.have.property('parseCerts');
            expect(dumpOptions.parseCerts).to.be.a('boolean').eq(true);
        });

        it('returns undefined for an unknown card', () => {
            let dumpOptions = CardUtil.dumpOptions(CardUtil.determineContainer({ atr: '000', description: [ 'an unknown card'] }));
            expect(dumpOptions, 'An unknown card should return undefined').to.be.undefined;
        });
    });

});
