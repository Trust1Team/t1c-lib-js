export { PubKeyService };
declare class PubKeyService {
    private static pubKey;
    static getPubKey(): string;
    static setPubKey(key: string): void;
}
