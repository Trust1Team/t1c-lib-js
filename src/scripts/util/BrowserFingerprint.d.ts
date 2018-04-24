export { BrowserFingerprint };
declare class BrowserFingerprint {
    static readonly BROWSER_AUTH_TOKEN_LOCATION: string;
    static get(): string;
    private static checkValidFingerprint();
    private static validateFingerprint(print);
    private static generateFingerprint();
}
