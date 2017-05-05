/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as _ from "lodash";
import * as platform from "platform";
import * as CoreModel from "../model/CoreModel";

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

    /**
     * Checks for card element in readers response
     * @param readers
     * @returns {any}
     */
    // TODO remove and use card-inserted query param
    private static checkReadersForCardObject(readers: CoreModel.CardReader[]): CoreModel.CardReader {
        if (!_.isEmpty(readers)) {
            _.forEach(readers, (reader: CoreModel.CardReader) => {
                if (reader.card) { return reader; }
            });
        } else {
            return null;
        }
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

    public pollCardInserted(secondsToPollCard: number,
                            callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                            connectReaderCb: () => void,
                            insertCardCb: () => void,
                            cardTimeoutCb: () => void): void {
        let maxSeconds = secondsToPollCard;
        let self = this;

        // recursive function
        cardTimeout(callback, cardTimeoutCb, connectReaderCb, insertCardCb);
        function cardTimeout(cb: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                             rtcb: () => void,
                             crcb: () => void,
                             iccb: () => void) {
            setTimeout(function () {
                // console.debug("seconds left:",maxSeconds);
                --maxSeconds;
                self.readers(function(error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) {
                    if (error) {
                        crcb(); // ask to connect reader
                        cardTimeout(cb, rtcb, crcb, iccb); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) { return rtcb(); } // reader timeout
                    else if (data.data.length === 0) {
                        crcb(); // ask to connect reader
                        cardTimeout(cb, rtcb, crcb, iccb);
                    } else {
                        let readerWithCard = CoreService.checkReadersForCardObject(data.data);
                        if (readerWithCard != null) {
                            return cb(null, { data: [readerWithCard], success: true });
                        } else {
                            iccb();
                            cardTimeout(cb, rtcb, crcb, iccb);
                        }
                    }
                });
            },         1000);
        }
    }

    public pollReaders(secondsToPollReader: number,
                       callback: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                       connectReaderCb: () => void,
                       readerTimeoutCb: () => void): void {
        let maxSeconds = secondsToPollReader;
        let self = this;

        // recursive function
        readerTimeout(callback, readerTimeoutCb, connectReaderCb);
        function readerTimeout(cb: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                               rtcb: () => void,
                               crcb: () => void) {
            setTimeout(function () {
                --maxSeconds;
                self.readers(function(error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse): void {
                    if (error) {
                        crcb(); // ask to connect reader
                        readerTimeout(cb, rtcb, crcb); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) { return rtcb(); } // reader timeout
                    else if (data.data.length === 0) {
                        crcb(); // ask to connect reader
                        readerTimeout(cb, rtcb, crcb);
                    }
                    else {
                        return cb(null, data);
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
