import { LocalAuthConnection } from '../client/Connection';
import { AbstractCore, BoolDataResponse, BrowserInfoResponse, CardReader, CardReadersResponse, DataResponse, InfoResponse, SingleReaderResponse } from './CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export declare class CoreService implements AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: LocalAuthConnection);
    private static cardInsertedFilter;
    private static platformInfo;
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: T1CLibException, data: InfoResponse) => void): Promise<InfoResponse>;
    infoBrowser(callback?: (error: T1CLibException, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse>;
    retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: T1CLibException, data: CardReader) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: T1CLibException, data: CardReadersResponse) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: T1CLibException, data: CardReadersResponse) => void, connectReaderCb?: () => void, readerTimeoutCb?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    infoBrowserSync(): BrowserInfoResponse;
    getUrl(): string;
    version(): Promise<string>;
}
