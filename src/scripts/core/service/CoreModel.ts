/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';

export { AbstractCore, T1CResponse, BoolDataResponse, DataResponse, DataArrayResponse, DataObjectResponse,
    InfoResponse, BrowserInfo, BrowserInfoResponse, Card, CardReader, CardReadersResponse, T1CCertificate,
    CertificateResponse, CertificatesResponse, SingleReaderResponse, PluginsResponse, PubKeyResponse };


interface AbstractCore {
    // async
    activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getConsent(title: string,
               codeWord: string,
               durationInDays?: number,
               alertLevel?: string,
               alertPosition?: string,
               type?: string,
               timeoutInSeconds?: number,
               callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    info(callback?: (error: CoreExceptions.RestException, data: InfoResponse) => void): void | Promise<InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;
    plugins(callback?: (error: CoreExceptions.RestException, data: PluginsResponse) => void): Promise<PluginsResponse>;
    pollCardInserted(secondsToPollCard?: number,
                     callback?: (error: CoreExceptions.RestException, data: CardReader) => void,
                     connectReader?: () => void,
                     insertCard?: () => void,
                     cardTimeout?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number,
                         callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                         connectReader?: () => void,
                         insertCard?: () => void,
                         cardTimeout?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number,
                callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                connectReader?: () => void,
                readerTimeout?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string,
           callback?: (error: CoreExceptions.RestException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): Promise<CardReadersResponse>;
    setPubKey(pubkey: string,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;

    // sync
    getUrl(): string;
    infoBrowserSync(): BrowserInfoResponse;

    // t1c-lib-info
    version(): Promise<string>;
}

class T1CResponse {
    constructor(public success: boolean, public data?: any) {}
}

class BoolDataResponse extends T1CResponse {
    constructor(public data: boolean, public success: boolean) {
        super(success, data);
    }
}

class DataResponse extends T1CResponse {
    constructor(public data: string, public success: boolean) {
        super(success, data);
    }
}

class DataArrayResponse extends T1CResponse {
    constructor(public data: string[], public success: boolean) {
        super(success, data);
    }
}


class DataObjectResponse extends T1CResponse {
    constructor(public data: { [key: string]: any }, public success: boolean) {
        super(success, data);
    }
}

class InfoResponse extends T1CResponse {
    constructor(public data: T1CInfo, public success: boolean) {
        super(success, data);
    }
}

class T1CInfo {
    constructor(public activated: boolean,
                public citrix: boolean,
                public managed: boolean,
                public arch: string,
                public os: string,
                public uid: string,
                public version: string) {}
}

class BrowserInfoResponse extends T1CResponse {
    constructor(public data: BrowserInfo, public success: boolean) {
        super(success, data);
    }
}

class BrowserInfo {
    constructor(public browser: { name: string, version: string },
                public manufacturer: string,
                public os: { name: string, version: string, architecture: number },
                public ua: string) {}
}

class Card {
    constructor(public atr: string, public description: string[]) {}
}

class CardReader {
    constructor(public id: string, public name: string, public pinpad: boolean, public card?: Card) {}
}

class CardReadersResponse extends T1CResponse {
    constructor(public data: CardReader[], public success: boolean) {
        super(success, data);
    }
}

class CertificateResponse extends T1CResponse {
    constructor(public data: T1CCertificate, public success: boolean) {
        super(success, data);
    }
}

class CertificatesResponse extends T1CResponse {
    constructor(public data: T1CCertificate[], public success: boolean) {
        super(success, data);
    }
}

class T1CCertificate {
    constructor(public base64: string, public parsed?: object) {}
}

class SingleReaderResponse extends T1CResponse {
    constructor(public data: CardReader, public success: boolean) {
        super(success, data);
    }
}

class PluginsResponse extends T1CResponse {
    constructor(public data: Plugin[], public success: boolean) {
        super(success, data);
    }
}

class Plugin {
    constructor(public id: string, public name: string, public version: string) {}
}

class PubKeyResponse extends T1CResponse {
    constructor(public data: string, public success: boolean) {
        super(success, data);
    }
}
