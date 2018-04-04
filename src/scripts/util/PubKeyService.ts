/**
 * @author Maarten Somers
 */
export { PubKeyService };

class PubKeyService {
    private static pubKey: string;

    public static getPubKey() {
        return PubKeyService.pubKey;
    }

    public static setPubKey(key: string) {
        PubKeyService.pubKey = '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----';
    }
}
