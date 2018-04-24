import { LocalAuthConnection } from '../client/Connection';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import * as CoreModel from './CoreModel';
import { CardReader } from './CoreModel';
export { CoreService };
declare class CoreService implements CoreModel.AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: LocalAuthConnection);
    private static cardInsertedFilter(inserted);
    private static platformInfo();
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: CoreExceptions.RestException, data: CoreModel.BoolDataResponse) => void): Promise<CoreModel.BoolDataResponse>;
    info(callback?: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse) => void): Promise<CoreModel.InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse) => void): Promise<CoreModel.BrowserInfoResponse>;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CardReader) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CoreModel.CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb?: () => void, readerTimeoutCb?: () => void): Promise<CoreModel.CardReadersResponse>;
    reader(reader_id: string, callback?: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse) => void): Promise<CoreModel.SingleReaderResponse>;
    readers(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): Promise<CoreModel.CardReadersResponse>;
    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): Promise<CoreModel.CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): Promise<CoreModel.CardReadersResponse>;
    infoBrowserSync(): CoreModel.BrowserInfoResponse;
    getUrl(): string;
    version(): Promise<string>;
}
