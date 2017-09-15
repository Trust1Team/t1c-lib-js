/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { LocalAuthConnection } from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as _ from "lodash";
import * as platform from "platform";
import * as CoreModel from "./CoreModel";
import { CardReader } from "./CoreModel";
import { Promise } from "es6-promise";

export { CoreService };


const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/card-readers";
const CORE_ACTIVATE = "/admin/activate";
const CORE_PUB_KEY = "/admin/certificate";

class CoreService implements CoreModel.AbstractCore {
    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {}

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
    public activate(callback?: (error: CoreExceptions.RestException, data: CoreModel.T1CResponse)
        => void): Promise<CoreModel.T1CResponse> {
        return this.connection.post(this.url, CORE_ACTIVATE, {}, undefined, callback);
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse)
        => void): Promise<CoreModel.PubKeyResponse> {
        return this.connection.get(this.url, CORE_PUB_KEY, undefined, callback);
    }

    public info(callback?: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse)
        => void): Promise<CoreModel.InfoResponse> {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, callback);
    }

    public infoBrowser(callback?: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse)
        => void): Promise<CoreModel.BrowserInfoResponse> {
        if (callback) { callback(null, CoreService.platformInfo()); }
        else { return Promise.resolve(CoreService.platformInfo()); }
    }

    public plugins(callback?: (error: CoreExceptions.RestException, data: CoreModel.PluginsResponse)
        => void): Promise<CoreModel.PluginsResponse> {
        return this.connection.getSkipCitrix(this.url, CORE_PLUGINS, undefined, callback);
    }

    public pollCardInserted(secondsToPollCard?: number,
                            callback?: (error: CoreExceptions.RestException, data: CardReader) => void,
                            connectReaderCb?: () => void,
                            insertCardCb?: () => void,
                            cardTimeoutCb?: () => void): Promise<CardReader> {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;

        if (callback) {
            poll();
        } else {
            // promise
            return new Promise((resolve, reject) => {
                poll(resolve, reject);
            });
        }

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            _.delay(() => {
                // console.debug("seconds left:", maxSeconds);
                --maxSeconds;
                self.readers((error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => {
                    if (error) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) { return cardTimeoutCb(); }
                        else {
                            // TODO improve handling of timeout in combination with promises
                            if (reject) { reject({ success: false, message: "Timed out" }); }
                        }
                    } // reader timeout
                    else if (data.data.length === 0) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject);
                    } else {
                        let readerWithCard = _.find(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, "card");
                        });
                        if (readerWithCard != null) {
                            if (resolve) { resolve(readerWithCard); }
                            else { return callback(null, readerWithCard); }
                        } else {
                            if (insertCardCb) { insertCardCb(); }
                            poll(resolve, reject);
                        }
                    }
                });
            }, 1000);
        }
    }

    public pollReadersWithCards(secondsToPollCard?: number,
                                callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                                connectReaderCb?: () => void,
                                insertCardCb?: () => void,
                                cardTimeoutCb?: () => void): Promise<CoreModel.CardReadersResponse> {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;

        if (callback) {
            poll();
        } else {
            // promise
            return new Promise((resolve, reject) => {
                poll(resolve, reject);
            });
        }

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            _.delay(() => {
                --maxSeconds;
                self.readers((error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => {
                    if (error) {
                        if (connectReaderCb) { connectReaderCb(); }
                        poll(resolve, reject);
                    }
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) { return cardTimeoutCb(); }
                        else {
                            // TODO improve handling of timeout in combination with promises
                            if (reject) { reject({ success: false, message: "Timed out" }); }
                        }
                    } // reader timeout
                    else if (!_.isEmpty(data) && !_.isEmpty(data.data)) {
                        // there are some readers, check if one of them has a card
                        let readersWithCards = _.filter(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, "card");
                        });
                        if (readersWithCards.length) {
                            // reader with card found (at least one), return data
                            let response = { data: readersWithCards, success: true };
                            if (resolve) { resolve(response); }
                            else { return callback(null, response); }
                        } else {
                            // no readers with card found, continue polling
                            if (insertCardCb) { insertCardCb(); }
                            poll(resolve, reject);
                        }
                    } else {
                        // length is zero, no readers connected
                        if (connectReaderCb) { connectReaderCb(); }
                        poll(resolve, reject);
                    }
                });
            }, 1000);
        }
    }

    public pollReaders(secondsToPollReader?: number,
                       callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse) => void,
                       connectReaderCb?: () => void,
                       readerTimeoutCb?: () => void): Promise<CoreModel.CardReadersResponse> {
        let maxSeconds = secondsToPollReader || 30;
        let self = this;

        if (callback) {
            poll();
        } else {
            // promise
            return new Promise((resolve, reject) => {
                poll(resolve, reject);
            });
        }


        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            _.delay(function () {
                --maxSeconds;
                self.readers(function(error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse): void {
                    if (error) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) {
                        if (readerTimeoutCb) { return readerTimeoutCb(); } // reader timeout
                        else {
                            // TODO improve handling of timeout in combination with promises
                            if (reject) { reject({ success: false, message: "Timed out" }); }
                        }
                    }
                    else if (_.isEmpty(data) || _.isEmpty(data.data)) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject);
                    }
                    else {
                        if (resolve) { resolve(data); }
                        else { return callback(null, data); }
                    }
                });
            }, 1000);
        }
    }

    public reader(reader_id: string,
                  callback?: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse)
                      => void): void | Promise<CoreModel.SingleReaderResponse> {
        return this.connection.get(this.url, CORE_READERS + "/" + reader_id, undefined, callback);
    }

    public readers(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, undefined, callback);
    }

    public readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(true), callback);
    }

    public readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(false), callback);
    }

    public setPubKey(pubkey: string,
                     callback?: (error: CoreExceptions.RestException, data: CoreModel.PubKeyResponse)
                         => void): Promise<CoreModel.PubKeyResponse> {
        return this.connection.put(this.url, CORE_PUB_KEY, { certificate: pubkey }, undefined, callback);
    }

    // sync
    public infoBrowserSync(): CoreModel.BrowserInfoResponse { return CoreService.platformInfo(); }
    public getUrl(): string { return this.url; }

    // get Lib version
    public version(): string {
        return "%%GULP_INJECT_VERSION%%";
    }
}
