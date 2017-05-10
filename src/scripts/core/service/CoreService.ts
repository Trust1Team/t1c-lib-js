/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as _ from "lodash";
import * as platform from "platform";
import * as CoreModel from "./CoreModel";
import { CardReader } from "./CoreModel";

const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/card-readers";
const CORE_ACTIVATE = "/admin/activate";
const CORE_PUB_KEY = "/admin/certificate";

class CoreService implements CoreModel.AbstractCore {
    // constructor
    constructor(private url: string, private connection: Connection) {}

    private static cardInsertedFilter(inserted: boolean): {} {
        return { "card-inserted": inserted };
    }

    private static platformInfo(): CoreModel.BrowserInfoResponse {
        return {
            data: {
                manufacturer: platform.manufacturer || "",
                browser: {
                    name: platform.name,
                    version: platform.version
                },
                os: {
                    name: platform.os.family,
                    version: platform.os.version,
                    architecture: platform.os.architecture
                },
                ua: platform.ua
            },
            success: true
        };
    }

    // async
    public activate(callback: (error: CoreExceptions.RestException, data: CoreModel.T1CResponse) => void): void {
        this.connection.post(this.url + CORE_ACTIVATE, {}, callback);
    }

    public getPubKey(callback: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void {
        this.connection.get(this.url + CORE_PUB_KEY, callback);
    }

    public info(callback: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse) => void): void {
        this.connection.get(this.url + CORE_INFO, callback);
    }

    public infoBrowser(callback: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse) => void): void {
        callback(null, CoreService.platformInfo());
    }

    public plugins(callback: (error: CoreExceptions.RestException, data: CoreModel.PluginsResponse) => void): void {
        this.connection.get(this.url + CORE_PLUGINS, callback);
    }

    pollCardInserted(secondsToPollCard: number,
                     callback: (error: CoreExceptions.RestException, data: CardReader) => void,
                     connectReaderCb: () => void,
                     insertCardCb: () => void,
                     cardTimeoutCb: () => void): void {
        let maxSeconds = secondsToPollCard;
        let self = this;

        // recursive function
        poll();

        function poll() {
            _.delay(() => {
                // console.debug("seconds left:",maxSeconds);
                --maxSeconds;
                self.readers((error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => {
                    if (error) {
                        connectReaderCb(); // ask to connect reader
                        poll(); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) { return cardTimeoutCb(); } // reader timeout
                    else if (data.data.length === 0) {
                        connectReaderCb(); // ask to connect reader
                        poll();
                    } else {
                        let readerWithCard = _.find(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, "card");
                        });
                        if (readerWithCard != null) {
                            return callback(null, readerWithCard);
                        } else {
                            insertCardCb();
                            poll();
                        }
                    }
                });
            }, 1000);
        }
    }

    public pollReadersWithCards(secondsToPollCard: number,
                                callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                                connectReaderCb: () => void,
                                insertCardCb: () => void,
                                cardTimeoutCb: () => void): void {
        let maxSeconds = secondsToPollCard;
        let self = this;

        // recursive function
        poll();

        function poll() {
            _.delay(() => {
                --maxSeconds;
                self.readers((error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => {
                    if (error) {
                        connectReaderCb();
                        poll();
                    }
                    if (maxSeconds === 0) { return cardTimeoutCb(); } // reader timeout
                    else if (!_.isEmpty(data) && !_.isEmpty(data.data)) {
                        // there are some readers, check if one of them has a card
                        let readersWithCards = _.filter(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, "card");
                        });
                        if (readersWithCards.length) {
                            // reader with card found (at least one), return data
                            return callback(null, { data: readersWithCards, success: true });
                        } else {
                            // no readers with card found, continue polling
                            insertCardCb();
                            poll();
                        }
                    } else {
                        // length is zero, no readers connected
                        connectReaderCb();
                        poll();
                    }
                });
            }, 1000);
        }
    }

    public pollReaders(secondsToPollReader: number,
                       callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                       connectReaderCb: () => void,
                       readerTimeoutCb: () => void): void {
        let maxSeconds = secondsToPollReader;
        let self = this;

        // recursive function
        poll();

        function poll() {
            _.delay(function () {
                --maxSeconds;
                self.readers(function(error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse): void {
                    if (error) {
                        connectReaderCb(); // ask to connect reader
                        poll(); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) { return readerTimeoutCb(); } // reader timeout
                    else if (_.isEmpty(data) || _.isEmpty(data.data)) {
                        connectReaderCb(); // ask to connect reader
                        poll();
                    }
                    else {
                        return callback(null, data);
                    }
                });
            }, 1000);
        }
    }

    public reader(reader_id: string, callback: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse) => void) {
        this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback);
    }

    public readers(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void {
        this.connection.get(this.url + CORE_READERS, callback);
    }

    public readersCardAvailable(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void {
        this.connection.get(this.url + CORE_READERS, callback, CoreService.cardInsertedFilter(true));
    }

    public readersCardsUnavailable(callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void): void {
        this.connection.get(this.url + CORE_READERS, callback, CoreService.cardInsertedFilter(false));
    }

    public setPubKey(pubkey: string, callback: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse) => void): void {
        this.connection.put(this.url + CORE_PUB_KEY, { certificate: pubkey }, callback);
    }

    // sync
    public infoBrowserSync(): CoreModel.BrowserInfoResponse { return CoreService.platformInfo(); }
    public getUrl(): string { return this.url; }

    // get Lib version
    public version(): string {
        return "%%GULP_INJECT_VERSION%%";
    }
}

export { CoreService };
