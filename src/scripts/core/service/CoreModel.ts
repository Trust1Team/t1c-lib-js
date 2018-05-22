/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';

export {
    AbstractCore, T1CResponse, BoolDataResponse, DataResponse, DataArrayResponse, DataObjectResponse,
    InfoResponse, BrowserInfo, BrowserInfoResponse, Card, CardReader, CardReadersResponse, T1CCertificate,
    CertificateResponse, CertificatesResponse, SingleReaderResponse, PluginsResponse, PubKeyResponse
};


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

    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string,
                       callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>

    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;

    info(callback?: (error: CoreExceptions.RestException, data: InfoResponse) => void): void | Promise<InfoResponse>;

    infoBrowser(callback?: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;

    plugins(callback?: (error: CoreExceptions.RestException, data: PluginsResponse) => void): Promise<PluginsResponse>;

    pollCardInserted(secondsToPollCard?: number,
                     callback?: (error: CoreExceptions.RestException, data: CardReader) => void,
                     connectReader?: () => void,
                     insertCard?: () => void,
                     cardTimeout?: () => void): void | Promise<CardReader>;

    pollReadersWithCards(secondsToPollCard?: number,
                         callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                         connectReader?: () => void,
                         insertCard?: () => void,
                         cardTimeout?: () => void): void | Promise<CardReadersResponse>;

    pollReaders(secondsToPollReader?: number,
                callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                connectReader?: () => void,
                readerTimeout?: () => void): void | Promise<CardReadersResponse>;

    reader(reader_id: string,
           callback?: (error: CoreExceptions.RestException, data: SingleReaderResponse) => void): void | Promise<SingleReaderResponse>;

    readers(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): void | Promise<CardReadersResponse>;

    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): void | Promise<CardReadersResponse>;

    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): void | Promise<CardReadersResponse>;

    setPubKey(pubkey: string,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): void | Promise<PubKeyResponse>;

    // sync
    getUrl(): string;

    infoBrowserSync(): BrowserInfoResponse;

    // t1c-lib-info
    version(): Promise<string>;
}

interface T1CResponse {
    data?: {}
    success: boolean
}

interface BoolDataResponse extends T1CResponse {
    data: boolean
}

interface DataResponse extends T1CResponse {
    data: string
}

interface DataArrayResponse extends T1CResponse {
    data: string[]
}


interface DataObjectResponse extends T1CResponse {
    data: {
        [key: string]: any
    }
}

interface InfoResponse extends T1CResponse {
    data: {
        activated: boolean
        citrix: boolean
        managed: boolean
        arch: string
        os: string
        uid: string
        version: string
    }
}

interface BrowserInfoResponse extends T1CResponse {
    data: BrowserInfo
}

interface BrowserInfo {
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

interface CertificateResponse extends T1CResponse {
    data: T1CCertificate
}

interface CertificatesResponse extends T1CResponse {
    data: T1CCertificate[]
}

interface T1CCertificate {
    base64: string,
    parsed?: object
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
