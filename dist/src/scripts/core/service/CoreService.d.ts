import { LocalAuthConnection } from '../client/Connection';
import { AbstractCore, BoolDataResponse, BrowserInfoResponse, CardReader, CardReadersResponse, InfoResponse, SingleReaderResponse } from './CoreModel';
import { RestException } from '../exceptions/CoreExceptions';
export declare class CoreService implements AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: LocalAuthConnection);
    private static cardInsertedFilter;
    private static platformInfo;
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    infoBrowser(callback?: (error: RestException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: RestException, data: CardReader) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: RestException, data: CardReadersResponse) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: RestException, data: CardReadersResponse) => void, connectReaderCb?: () => void, readerTimeoutCb?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string, callback?: (error: RestException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: RestException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    infoBrowserSync(): BrowserInfoResponse;
    getUrl(): string;
    version(): Promise<string>;
}
