/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { LocalAuthConnection } from '../client/Connection';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import * as _ from 'lodash';
import * as platform from 'platform';
import * as CoreModel from './CoreModel';
import { CardReader } from './CoreModel';
import { ResponseHandler } from '../../util/ResponseHandler';

export { CoreService };


const CORE_CONSENT = '/consent';
const CORE_INFO = '/';
const CORE_READERS = '/card-readers';

/**
 * Core service fucntions: GCL information, reader detection, consent, polling, etc.
 */
class CoreService implements CoreModel.AbstractCore {
    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {}

    private static cardInsertedFilter(inserted: boolean): {} {
        return { 'card-inserted': inserted };
    }

    private static platformInfo(): CoreModel.BrowserInfoResponse {
        return {
            data: {
                manufacturer: platform.manufacturer || '',
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

    public getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string,
                      alertPosition?: string, type?: string, timeoutInSeconds?: number,
                      callback?: (error: CoreExceptions.RestException, data: CoreModel.BoolDataResponse)
                          => void): Promise<CoreModel.BoolDataResponse> {
        if (!title || !title.length) {
            return ResponseHandler.error({ status: 400, description: 'Title is required!', code: '801' }, callback);
        }
        if (!codeWord || !codeWord.length) {
            return ResponseHandler.error({ status: 400, description: 'Code word is required!', code: '801' }, callback);
        }
        let days: number = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) { days = durationInDays; }

        let timeout: number = this.connection.cfg.defaultConsentTimeout;
        if (timeoutInSeconds) { timeout = timeoutInSeconds; }
        return this.connection.post(this.url, CORE_CONSENT,
            { title, text: codeWord, days, alert_level: alertLevel, alert_position: alertPosition, type, timeout },
            undefined, undefined, callback);
    }

    public info(callback?: (error: CoreExceptions.RestException, data: CoreModel.InfoResponse)
        => void): Promise<CoreModel.InfoResponse> {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, undefined, callback);
    }

    public infoBrowser(callback?: (error: CoreExceptions.RestException, data: CoreModel.BrowserInfoResponse)
        => void): Promise<CoreModel.BrowserInfoResponse> {
        if (callback) { callback(null, CoreService.platformInfo()); }
        else { return Promise.resolve(CoreService.platformInfo()); }
    }

    public pollCardInserted(secondsToPollCard?: number,
                            callback?: (error: CoreExceptions.RestException, data: CardReader) => void,
                            connectReaderCb?: () => void,
                            insertCardCb?: () => void,
                            cardTimeoutCb?: () => void): Promise<CardReader> {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;

        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        // promise
        return new Promise<CardReader>((resolve, reject) => {
            poll(resolve, reject);
        });

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            _.delay(() => {
                // console.debug('seconds left:', maxSeconds);
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
                            if (reject) { reject({ success: false, message: 'Timed out' }); }
                        }
                    } // reader timeout
                    else if (data.data.length === 0) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject);
                    } else {
                        let readerWithCard = _.find(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, 'card');
                        });
                        if (readerWithCard != null) {
                            callback(null, readerWithCard);
                            resolve(readerWithCard);
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

        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        // promise
        return new Promise<CoreModel.CardReadersResponse>((resolve, reject) => {
            poll(resolve, reject);
        });

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
                            if (reject) { reject({ success: false, message: 'Timed out' }); }
                        }
                    } // reader timeout
                    else if (!_.isEmpty(data) && !_.isEmpty(data.data)) {
                        // there are some readers, check if one of them has a card
                        let readersWithCards = _.filter(data.data, (reader: CoreModel.CardReader) => {
                            return _.has(reader, 'card');
                        });
                        if (readersWithCards.length) {
                            // reader with card found (at least one), return data
                            let response = { data: readersWithCards, success: true };
                            callback(null, response);
                            resolve(response);
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

        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        // promise
        return new Promise<CoreModel.CardReadersResponse>((resolve, reject) => {
            poll(resolve, reject);
        });

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
                            if (reject) { reject({ success: false, message: 'Timed out' }); }
                        }
                    }
                    else if (_.isEmpty(data) || _.isEmpty(data.data)) {
                        if (connectReaderCb) { connectReaderCb(); } // ask to connect reader
                        poll(resolve, reject);
                    }
                    else {
                        callback(null, data);
                        resolve(data);
                    }
                });
            }, 1000);
        }
    }

    public reader(reader_id: string,
                  callback?: (error: CoreExceptions.RestException, data: CoreModel.SingleReaderResponse)
                      => void): Promise<CoreModel.SingleReaderResponse> {
        return this.connection.get(this.url, CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    }

    public readers(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, undefined, undefined, callback);
    }

    public readersCardAvailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(true), undefined, callback);
    }

    public readersCardsUnavailable(callback?: (error: CoreExceptions.RestException, data: CoreModel.CardReadersResponse)
        => void): Promise<CoreModel.CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(false), undefined, callback);
    }

    // sync
    public infoBrowserSync(): CoreModel.BrowserInfoResponse { return CoreService.platformInfo(); }
    public getUrl(): string { return this.url; }

    // get Lib version
    public version(): Promise<string> {
        return Promise.resolve('%%GULP_INJECT_VERSION%%');
    }
}
