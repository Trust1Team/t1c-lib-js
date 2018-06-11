/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import {RestException} from '../exceptions/CoreExceptions';

export { AbstractCore, T1CResponse, BoolDataResponse, DataResponse, DataArrayResponse, DataObjectResponse,
    InfoResponse, BrowserInfo, BrowserInfoResponse, Card, CardReader, CardReadersResponse, T1CCertificate,
    CertificateResponse, CertificatesResponse, SingleReaderResponse, T1CContainer, T1CInfo };


interface AbstractCore {
    // async
    getConsent(title: string,
               codeWord: string,
               durationInDays?: number,
               alertLevel?: string,
               alertPosition?: string,
               type?: string,
               timeoutInSeconds?: number,
               callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>
    info(callback?: (error: CoreExceptions.RestException, data: InfoResponse) => void): void | Promise<InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;
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
                public containers: T1CContainer[],
                public version: string) {}
}

class T1CContainer {
    constructor(public name: string, public version: string, public status: string) {}
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
    constructor(public base64: string, public id?: string, public parsed?: object ) {}
}

class SingleReaderResponse extends T1CResponse {
    constructor(public data: CardReader, public success: boolean) {
        super(success, data);
    }
}
