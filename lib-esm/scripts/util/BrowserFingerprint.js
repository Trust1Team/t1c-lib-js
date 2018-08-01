import * as store from 'store2';
import * as Base64 from 'Base64';
import * as uuid from 'uuid/v4';
import * as sha from 'sha256';
export class BrowserFingerprint {
    static get() {
        return BrowserFingerprint.checkValidFingerprint();
    }
    static checkValidFingerprint() {
        let fingerPrint;
        try {
            fingerPrint = store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
        }
        catch (e) { }
        if (!fingerPrint) {
            fingerPrint = BrowserFingerprint.generateFingerprint();
        }
        if (BrowserFingerprint.validateFingerprint(fingerPrint)) {
            return fingerPrint;
        }
        else {
            return BrowserFingerprint.generateFingerprint();
        }
    }
    static validateFingerprint(print) {
        const resolvedToken = Base64.atob(print);
        const checkbits = resolvedToken.substring(resolvedToken.length - 8, resolvedToken.length);
        const initUuid = resolvedToken.substring(0, resolvedToken.length - 9);
        const initUuidSha = sha(initUuid);
        const tobeverifiedbits = initUuidSha.substring(initUuidSha.length - 8, initUuidSha.length);
        return tobeverifiedbits === checkbits;
    }
    static generateFingerprint() {
        const browserId = uuid();
        const sha256BrowserId = sha(browserId);
        const checkbits = sha256BrowserId.substring(sha256BrowserId.length - 8, sha256BrowserId.length);
        const resolvedToken = browserId + '-' + checkbits;
        const token = Base64.btoa(browserId + '-' + checkbits);
        store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION, token);
        return token;
    }
}
BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION = 't1c-js-browser-id-token';
//# sourceMappingURL=BrowserFingerprint.js.map