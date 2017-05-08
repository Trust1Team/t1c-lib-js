/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";


interface AbstractCore {
    // async
    activate(callback: (error: CoreExceptions.RestException, data: T1CResponse) => void): void;
    getPubKey(callback: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): void;
    info(callback: (error: CoreExceptions.RestException, data: InfoResponse) => void): void;
    infoBrowser(callback: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): void;
    plugins(callback: (error: CoreExceptions.RestException, data: PluginsResponse) => void): void;
    pollCardInserted(secondsToPollCard: number,
                     callback: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                     connectReader: () => void,
                     insertCard: () => void,
                     cardTimeout: () => void

    ): void;
    pollReaders(secondsToPollReader: number,
                callback: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                connectReader: () => void,
                readerTimeout: () => void
    ): void;
    reader(reader_id: string, callback: (error: CoreExceptions.RestException, data: SingleReaderResponse) => void): void;
    readers(callback: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): void;
    readersCardAvailable(callback: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): void;
    readersCardsUnavailable(callback: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): void;
    setPubKey(pubkey: string, callback: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): void;

    // sync
    getUrl(): string;
    infoBrowserSync(): BrowserInfoResponse;

    // t1c-lib-info
    version(): string;
}

interface T1CResponse {
    data?: {}
    success: boolean
}

interface InfoResponse extends T1CResponse {
    data: {
        activated: boolean
        managed: boolean
        arch: string
        os: string
        uid: string
        version: string
    }
}

interface BrowserInfoResponse extends T1CResponse {
    data: {
        manufacturer: string
        browser: {
            name: string
            version: string
        }
        os: {
            name: string
            version: string
            architecture: number
        }
        ua: string
    }
}

interface Card {
    atr: string,
    description: string[]
}

interface CardReader {
    card?: Card
    id: string
    name: string
    pinpad: boolean
}

interface CardReadersResponse extends T1CResponse {
    data: CardReader[]
}

interface SingleReaderResponse extends T1CResponse {
    data: CardReader
}

interface PluginsResponse extends T1CResponse {
    data: [{
        id: string
        name: string
        version: string
    }]
}

interface PubKeyResponse extends T1CResponse {
    data: string
}

export { AbstractCore, T1CResponse, InfoResponse, BrowserInfoResponse, Card, CardReader,
    CardReadersResponse, SingleReaderResponse, PluginsResponse, PubKeyResponse };
