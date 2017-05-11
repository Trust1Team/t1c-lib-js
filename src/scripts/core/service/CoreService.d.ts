import { Connection } from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as CoreModel from "./CoreModel";
import { CardReader } from "./CoreModel";
export { CoreService };
declare class CoreService implements CoreModel.AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: Connection);
    private static cardInsertedFilter(inserted);
    private static platformInfo();
    activate(callback: (error: CoreExceptions.RestException, data: CoreModel.T1CResponse) => void): void;
    getPubKey(callback: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void;
    info(callback: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse) => void): void;
    infoBrowser(callback: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse) => void): void;
    plugins(callback: (error: CoreExceptions.RestException, data: CoreModel.PluginsResponse) => void): void;
    pollCardInserted(secondsToPollCard: number, callback: (error: CoreExceptions.RestException, data: CardReader) => void, connectReaderCb: () => void, insertCardCb: () => void, cardTimeoutCb: () => void): void;
    pollReadersWithCards(secondsToPollCard: number, callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb: () => void, insertCardCb: () => void, cardTimeoutCb: () => void): void;
    pollReaders(secondsToPollReader: number, callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void, connectReaderCb: () => void, readerTimeoutCb: () => void): void;
    reader(reader_id: string, callback: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse) => void): void;
    readers(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void;
    readersCardAvailable(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void;
    readersCardsUnavailable(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void;
    setPubKey(pubkey: string, callback: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void;
    infoBrowserSync(): CoreModel.BrowserInfoResponse;
    getUrl(): string;
    version(): string;
}
