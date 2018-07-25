import * as store from 'store2';
import * as Base64 from 'Base64';
import { v4 as uuid } from 'uuid';
import * as sha from 'sha256';
var BrowserFingerprint = (function () {
    function BrowserFingerprint() {
    }
    BrowserFingerprint.get = function () {
        return BrowserFingerprint.checkValidFingerprint();
    };
    BrowserFingerprint.checkValidFingerprint = function () {
        var fingerPrint;
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
    };
    BrowserFingerprint.validateFingerprint = function (print) {
        var resolvedToken = Base64.atob(print);
        var checkbits = resolvedToken.substring(resolvedToken.length - 8, resolvedToken.length);
        var initUuid = resolvedToken.substring(0, resolvedToken.length - 9);
        var initUuidSha = sha(initUuid);
        var tobeverifiedbits = initUuidSha.substring(initUuidSha.length - 8, initUuidSha.length);
        return tobeverifiedbits === checkbits;
    };
    BrowserFingerprint.generateFingerprint = function () {
        var browserId = uuid();
        var sha256BrowserId = sha(browserId);
        var checkbits = sha256BrowserId.substring(sha256BrowserId.length - 8, sha256BrowserId.length);
        var resolvedToken = browserId + '-' + checkbits;
        var token = Base64.btoa(browserId + '-' + checkbits);
        store(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION, token);
        return token;
    };
    BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION = 't1c-js-browser-id-token';
    return BrowserFingerprint;
}());
export { BrowserFingerprint };
//# sourceMappingURL=BrowserFingerprint.js.map