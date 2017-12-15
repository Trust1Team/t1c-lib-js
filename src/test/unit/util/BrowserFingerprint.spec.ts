/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import { BrowserFingerprint } from '../../../scripts/util/BrowserFingerprint';
import * as ls from 'local-storage';


describe('Browser Fingerprint Utility', () => {

    describe('can set and retrieve browser fingerprint token', function () {
        beforeEach(() => {
            ls.clear();
        });

        it('can generate a valid token', () => {
            let token = BrowserFingerprint.get();
            expect(token).to.be.a('string');
        });

        it('returns the same token for each call after generating one', () => {
            let token = BrowserFingerprint.get();
            setTimeout(function () {
                let newToken = BrowserFingerprint.get();
                expect(token).to.be.a('string');
                expect(newToken).to.be.a('string');
                expect(token).to.eq(newToken);
            }, 1000);
        });

        it('adds a new token if the previous one disappears for whatever reason', () => {
            let token = BrowserFingerprint.get();
            ls.remove(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
            let newToken = BrowserFingerprint.get();

            expect(token).to.be.a('string');
            expect(newToken).to.be.a('string');
            expect(token).to.not.eq(newToken);
        });
    });

});
