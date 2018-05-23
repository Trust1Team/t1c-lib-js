/**
 * @author Michallis Pashidis
 * @since 2017
 */
import * as store from 'store2';
import * as bases from 'bases';
import * as _ from 'lodash';
import * as Base64 from 'Base64';
import { v4 as uuid } from 'uuid';
import * as sha from 'sha256';

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
            fingerPrint = store.get(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
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
        //base64 decode
        const resolvedToken = Base64.atob(print);
        //retrieve bits
        const checkbits = resolvedToken.substring(resolvedToken.length - 8, resolvedToken.length);
        //get uuid
        const initUuid = resolvedToken.substring(0, resolvedToken.length - 9);
        //calculate sha256
        const initUuidSha = sha(initUuid);
        const tobeverifiedbits = initUuidSha.substring(initUuidSha.length - 8, initUuidSha.length);
        return tobeverifiedbits === checkbits;
    }

    private static generateFingerprint(): string {
        const browserId: string = uuid();
        const sha256BrowserId = sha(browserId);
        const checkbits = sha256BrowserId.substring(sha256BrowserId.length-8, sha256BrowserId.length);
        const resolvedToken = browserId+'-'+checkbits;
        const token = Base64.btoa(browserId+'-'+checkbits);
        store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION, token);
        return token;
    }
}
