import { BrowserFingerprint } from './../../../scripts/util/BrowserFingerprint';

import * as store from 'store2';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

describe('Browser Fingerprint Utility', () => {

    describe('can set and retrieve browser fingerprint token', function () {
        beforeEach(() => {
            store.clear();
        });

        test('can generate a valid token', () => {
            let token = BrowserFingerprint.get();
        });

        test('returns the same token for each call after generating one', () => {
            let token = BrowserFingerprint.get();
            setTimeout(function () {
                let newToken = BrowserFingerprint.get();
                expect(token).toEqual(newToken);
            }, 1000);
        });

        test('adds a new token if the previous one disappears for whatever reason', () => {
            let token = BrowserFingerprint.get();
            store.remove(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
            let newToken = BrowserFingerprint.get();
            expect(token).not.toEqual(newToken);
        });
    });

});
