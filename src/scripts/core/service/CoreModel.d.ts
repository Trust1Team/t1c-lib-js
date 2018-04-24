import * as CoreExceptions from '../exceptions/CoreExceptions';
export { AbstractCore, T1CResponse, BoolDataResponse, DataResponse, DataArrayResponse, DataObjectResponse, InfoResponse, BrowserInfo, BrowserInfoResponse, Card, CardReader, CardReadersResponse, T1CCertificate, CertificateResponse, CertificatesResponse, SingleReaderResponse, T1CContainer, T1CInfo };
interface AbstractCore {
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: CoreExceptions.RestException, data: InfoResponse) => void): void | Promise<InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CardReader) => void, connectReader?: () => void, insertCard?: () => void, cardTimeout?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void, connectReader?: () => void, insertCard?: () => void, cardTimeout?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void, connectReader?: () => void, readerTimeout?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string, callback?: (error: CoreExceptions.RestException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    getUrl(): string;
    infoBrowserSync(): BrowserInfoResponse;
    version(): Promise<string>;
}
declare class T1CResponse {
    success: boolean;
    data: any;
    constructor(success: boolean, data?: any);
}
declare class BoolDataResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
declare class DataResponse extends T1CResponse {
    data: string;
    success: boolean;
    constructor(data: string, success: boolean);
}
declare class DataArrayResponse extends T1CResponse {
    data: string[];
    success: boolean;
    constructor(data: string[], success: boolean);
}
declare class DataObjectResponse extends T1CResponse {
    data: {
        [key: string]: any;
    };
    success: boolean;
    constructor(data: {
        [key: string]: any;
    }, success: boolean);
}
declare class InfoResponse extends T1CResponse {
    data: T1CInfo;
    success: boolean;
    constructor(data: T1CInfo, success: boolean);
}
declare class T1CInfo {
    activated: boolean;
    citrix: boolean;
    managed: boolean;
    arch: string;
    os: string;
    uid: string;
    containers: T1CContainer[];
    version: string;
    constructor(activated: boolean, citrix: boolean, managed: boolean, arch: string, os: string, uid: string, containers: T1CContainer[], version: string);
}
declare class T1CContainer {
    name: string;
    version: string;
    status: string;
    constructor(name: string, version: string, status: string);
}
declare class BrowserInfoResponse extends T1CResponse {
    data: BrowserInfo;
    success: boolean;
    constructor(data: BrowserInfo, success: boolean);
}
declare class BrowserInfo {
    browser: {
        name: string;
        version: string;
    };
    manufacturer: string;
    os: {
        name: string;
        version: string;
        architecture: number;
    };
    ua: string;
    constructor(browser: {
        name: string;
        version: string;
    }, manufacturer: string, os: {
        name: string;
        version: string;
        architecture: number;
    }, ua: string);
}
declare class Card {
    atr: string;
    description: string[];
    constructor(atr: string, description: string[]);
}
declare class CardReader {
    id: string;
    name: string;
    pinpad: boolean;
    card: Card;
    constructor(id: string, name: string, pinpad: boolean, card?: Card);
}
declare class CardReadersResponse extends T1CResponse {
    data: CardReader[];
    success: boolean;
    constructor(data: CardReader[], success: boolean);
}
declare class CertificateResponse extends T1CResponse {
    data: T1CCertificate;
    success: boolean;
    constructor(data: T1CCertificate, success: boolean);
}
declare class CertificatesResponse extends T1CResponse {
    data: T1CCertificate[];
    success: boolean;
    constructor(data: T1CCertificate[], success: boolean);
}
declare class T1CCertificate {
    base64: string;
    id: string;
    parsed: object;
    constructor(base64: string, id?: string, parsed?: object);
}
declare class SingleReaderResponse extends T1CResponse {
    data: CardReader;
    success: boolean;
    constructor(data: CardReader, success: boolean);
}
