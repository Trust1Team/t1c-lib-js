/**
 * @author Maarten Somers
 * @since 2017
 */
import * as cuid from 'cuid';
import * as bases from 'bases';
import * as _ from 'lodash';
import * as store from 'store2';

export { BrowserFingerprint };

class BrowserFingerprint {
    static readonly BROWSER_AUTH_TOKEN_LOCATION = 't1c-js-browser-id-token';

    public static get(): string {
        return BrowserFingerprint.checkValidFingerprint();
    }

    private static checkValidFingerprint(): string {
        // try to retrieve fingerprint
        let fingerPrint;
        try {
            fingerPrint = store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
        } catch (e) { /* will fail if the property exists but is null or undefined, after catching the error nothing needs to be done */ }
        // check if there is an authentication token in localStorage, if not, set it
        if (!fingerPrint) { fingerPrint = BrowserFingerprint.generateFingerprint(); }
        // check if the fingerprint is valid
        if (BrowserFingerprint.validateFingerprint(fingerPrint)) {
            return fingerPrint;
        } else {
            return BrowserFingerprint.generateFingerprint();
        }
    }

    private static validateFingerprint(print: string): boolean {
        // drop last two digits from print and recalculate
        const printBase = _.join(_.dropRight(_.split(print, ''), 2), '');
        const base36 = printBase.substr(1, 8);
        const token =  printBase + (bases.fromBase36(base36) % 97);
        return token === print;
    }

    private static generateFingerprint(): string {
        const browserCuid = cuid();
        const base36 = browserCuid.substr(1, 8);
        const token = browserCuid + (bases.fromBase36(base36) % 97);
        store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION, token);
        return token;
    }
}
