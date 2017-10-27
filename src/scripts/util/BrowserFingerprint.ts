/**
 * @author Maarten Somers
 * @since 2017
 */
import * as cuid from 'cuid';
import * as ls from 'local-storage';
import * as bases from 'bases';

export { BrowserFingerprint };

class BrowserFingerprint {
    static readonly BROWSER_AUTH_TOKEN_LOCATION = 't1c-js-browser-id-token';

    public static get(): string {
        // check if there is an authentication token in localStorage, if not, set it
        if (!ls.get(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION)) {
            const browserCuid = cuid();
            const base36 = browserCuid.substr(1, 8);
            ls.set(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION, browserCuid + (bases.fromBase36(base36) % 97));
        }
        return ls.get(BrowserFingerprint.BROWSER_AUTH_TOKEN_LOCATION);
    }
}
