import { Connection } from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as CoreModel from "./CoreModel";
import { CardReader } from "./CoreModel";
import { Promise } from "es6-promise";
export { CoreService };
declare class CoreService implements CoreModel.AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: Connection);
    private static cardInsertedFilter(inserted);
    private static platformInfo();
    activate(callback?: (error: CoreExceptions.RestException, data: CoreModel.T1CResponse) => void): void | Promise<CoreModel.T1CResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void | Promise<CoreModel.PubKeyResponse>;
    info(callback?: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse) => void): void | Promise<CoreModel.InfoResponse>;
    infoBrowser(callback?: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse) => void): void | Promise<CoreModel.BrowserInfoResponse>;
    plugins(callback?: (error: CoreExceptions.RestException, data: CoreModel.PluginsResponse) => void): void | Promise<CoreModel.PluginsResponse>;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CardReader) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): void | Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): void | Promise<CoreModel.CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb?: () => void, readerTimeoutCb?: () => void): void | Promise<CoreModel.CardReadersResponse>;
    reader(reader_id: string, callback?: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse) => void): void | Promise<CoreModel.SingleReaderResponse>;
    readers(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void | Promise<CoreModel.CardReadersResponse>;
    readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void | Promise<CoreModel.CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void | Promise<CoreModel.CardReadersResponse>;
    setPubKey(pubkey: string, callback?: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void | Promise<CoreModel.PubKeyResponse>;
    infoBrowserSync(): CoreModel.BrowserInfoResponse;
    getUrl(): string;
    version(): string;
}
