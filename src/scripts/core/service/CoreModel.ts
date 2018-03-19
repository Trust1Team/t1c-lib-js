/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import * as Bluebird from 'bluebird';

export { AbstractCore, T1CResponse, BoolDataResponse, DataResponse, DataArrayResponse, DataObjectResponse,
    InfoResponse, BrowserInfo, BrowserInfoResponse, Card, CardReader, CardReadersResponse, T1CCertificate,
    CertificateResponse, CertificatesResponse, SingleReaderResponse, PluginsResponse, PubKeyResponse };


interface AbstractCore {
    // async
    activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Bluebird<T1CResponse>;
    getConsent(title: string,
               codeWord: string,
               durationInDays?: number,
               alertLevel?: string,
               alertPosition?: string,
               type?: string,
               timeoutInSeconds?: number,
               callback?: (error: CoreExceptions.RestException, data: BoolDataResponse) => void): Bluebird<BoolDataResponse>
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Bluebird<PubKeyResponse>;
    info(callback?: (error: CoreExceptions.RestException, data: InfoResponse) => void): void | Bluebird<InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: BrowserInfoResponse) => void): Bluebird<BrowserInfoResponse>;
    plugins(callback?: (error: CoreExceptions.RestException, data: PluginsResponse) => void): Bluebird<PluginsResponse>;
    pollCardInserted(secondsToPollCard?: number,
                     callback?: (error: CoreExceptions.RestException, data: CardReader) => void,
                     connectReader?: () => void,
                     insertCard?: () => void,
                     cardTimeout?: () => void): void | Bluebird<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number,
                         callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                         connectReader?: () => void,
                         insertCard?: () => void,
                         cardTimeout?: () => void): void | Bluebird<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number,
                callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void,
                connectReader?: () => void,
                readerTimeout?: () => void): void | Bluebird<CardReadersResponse>;
    reader(reader_id: string,
           callback?: (error: CoreExceptions.RestException, data: SingleReaderResponse) => void): void | Bluebird<SingleReaderResponse>;
    readers(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse) => void): void | Bluebird<CardReadersResponse>;
    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): void | Bluebird<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CardReadersResponse)
        => void): void | Bluebird<CardReadersResponse>;
    setPubKey(pubkey: string,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): void | Bluebird<PubKeyResponse>;

    // sync
    getUrl(): string;
    infoBrowserSync(): BrowserInfoResponse;

    // t1c-lib-info
    version(): Bluebird<string>;
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
    data: any
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
