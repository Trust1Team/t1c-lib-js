import {LocalAuthConnection} from '../client/Connection';
import * as platform from 'platform';
import {ResponseHandler} from '../../util/ResponseHandler';
import {AbstractCore, BoolDataResponse, BrowserInfoResponse, CardReader, CardReadersResponse, CheckGclVersion, CheckGclVersionResponse, DataResponse, InfoResponse, SingleReaderResponse} from './CoreModel';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {Util} from '../../util/Utils';
import {GCLClient} from '../../..';

const CORE_CONSENT = '/consent';
const CORE_INFO = '/';
const CORE_READERS = '/card-readers';
const CORE_CONSENT_IMPLICIT = '/consent/implicit';
const CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
import * as semver from 'semver';


declare var VERSION: string;


/**
 * Core service fucntions: GCL information, reader detection, consent, polling, etc.
 */
export class CoreService implements AbstractCore {
    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {
    }

    private static cardInsertedFilter(inserted: boolean): {} {
        return {'card-inserted': inserted};
    }

    private static platformInfo(): BrowserInfoResponse {
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
                      callback?: (error: T1CLibException, data: BoolDataResponse)
                          => void): Promise<BoolDataResponse> {
        if (!title || !title.length) {
            return ResponseHandler.error({status: 400, description: 'Title is required!', code: '801'}, callback);
        }
        if (!codeWord || !codeWord.length) {
            return ResponseHandler.error({status: 400, description: 'Code word is required!', code: '801'}, callback);
        }
        let days: number = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }

        let timeout: number = this.connection.cfg.defaultConsentTimeout;
        if (timeoutInSeconds) {
            timeout = timeoutInSeconds;
        }
        return this.connection.post(this.url, CORE_CONSENT,
            {title, text: codeWord, days, alert_level: alertLevel, alert_position: alertPosition, type, timeout},
            undefined, undefined, callback);
    }

    /*NOTE: The application is responsible to copy the codeWord on the clipboard BEFORE calling this function*/
    public getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (!codeWord || !codeWord.length) {
            return ResponseHandler.error({status: 400, description: 'Code word is required!', code: '801'}, callback);
        }
        let days: number = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        return this.connection.post(this.url, CORE_CONSENT_IMPLICIT,
            {challenge: codeWord, days, type}, undefined, undefined, callback);
    }

    public info(callback?: (error: T1CLibException, data: InfoResponse)
        => void): Promise<InfoResponse> {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, undefined, callback);
    }

    public infoBrowser(callback?: (error: T1CLibException, data: BrowserInfoResponse)
        => void): Promise<BrowserInfoResponse> {
        if (callback) {
            callback(null, CoreService.platformInfo());
        } else {
            return Promise.resolve(CoreService.platformInfo());
        }
    }

    public retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.url, CORE_RETUREVE_ENCRYPTED_PIN, {}, undefined, undefined, callback);
    }

    public pollCardInserted(secondsToPollCard?: number,
                            callback?: (error: T1CLibException, data: CardReader) => void,
                            connectReaderCb?: () => void,
                            insertCardCb?: () => void,
                            cardTimeoutCb?: () => void): Promise<CardReader> {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;

        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        // promise
        return new Promise<CardReader>((resolve, reject) => {
            poll(resolve, reject);
        });

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {

            setTimeout(() => {
                --maxSeconds;
                self.readers((error: T1CLibException, data: CardReadersResponse) => {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        } // ask to connect reader
                        poll(resolve, reject); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) {
                            return cardTimeoutCb();
                        } else {
                            if (reject) {
                                reject({success: false, message: 'Timed out'});
                            }
                        }
                    } // reader timeout
                    else if (data.data.length === 0) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        } // ask to connect reader
                        poll(resolve, reject);
                    } else {
                        let readerWithCard = data.data.find((reader: CardReader) => {
                            return !!reader.card;
                        });
                        if (readerWithCard != null) {
                            callback(null, readerWithCard);
                            resolve(readerWithCard);
                        } else {
                            if (insertCardCb) {
                                insertCardCb();
                            }
                            poll(resolve, reject);
                        }
                    }
                });
            }, 1000);
        }
    }

    public pollReadersWithCards(secondsToPollCard?: number,
                                callback?: (error: T1CLibException, data: CardReadersResponse) => void,
                                connectReaderCb?: () => void,
                                insertCardCb?: () => void,
                                cardTimeoutCb?: () => void): Promise<CardReadersResponse> {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;

        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        // promise
        return new Promise<CardReadersResponse>((resolve, reject) => {
            poll(resolve, reject);
        });

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            setTimeout(() => {
                --maxSeconds;
                self.readers((error: T1CLibException, data: CardReadersResponse) => {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) {
                            return cardTimeoutCb();
                        } else {
                            if (reject) {
                                reject({success: false, message: 'Timed out'});
                            }
                        }
                    } // reader timeout
                    else if (!Util.isEmpty(data) && !Util.isEmpty(data.data)) {
                        // there are some readers, check if one of them has a card
                        let readersWithCards = data.data.filter((reader: CardReader) => {
                            return !!reader.card;
                        });
                        if (readersWithCards.length) {
                            // reader with card found (at least one), return data
                            let response = {data: readersWithCards, success: true};
                            callback(null, response);
                            resolve(response);
                        } else {
                            // no readers with card found, continue polling
                            if (insertCardCb) {
                                insertCardCb();
                            }
                            poll(resolve, reject);
                        }
                    } else {
                        // length is zero, no readers connected
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                });
            }, 1000);
        }
    }

    public pollReaders(secondsToPollReader?: number,
                       callback?: (error: T1CLibException, data: CardReadersResponse) => void,
                       connectReaderCb?: () => void,
                       readerTimeoutCb?: () => void): Promise<CardReadersResponse> {
        let maxSeconds = secondsToPollReader || 30;
        let self = this;

        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        // promise
        return new Promise<CardReadersResponse>((resolve, reject) => {
            poll(resolve, reject);
        });

        function poll(resolve?: (data: any) => void, reject?: (error: any) => void) {
            setTimeout(() => {
                --maxSeconds;
                self.readers(function (error: T1CLibException, data: CardReadersResponse): void {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        } // ask to connect reader
                        poll(resolve, reject); // no reader found and waiting - recursive call
                    }
                    // no error but stop
                    if (maxSeconds === 0) {
                        if (readerTimeoutCb) {
                            return readerTimeoutCb();
                        } // reader timeout
                        else {
                            if (reject) {
                                reject({success: false, message: 'Timed out'});
                            }
                        }
                    } else if (Util.isEmpty(data) || Util.isEmpty(data.data)) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        } // ask to connect reader
                        poll(resolve, reject);
                    } else {
                        callback(null, data);
                        resolve(data);
                    }
                });
            }, 1000);
        }
    }

    public reader(reader_id: string,
                  callback?: (error: T1CLibException, data: SingleReaderResponse)
                      => void): Promise<SingleReaderResponse> {
        return this.connection.get(this.url, CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    }

    public readers(callback?: (error: T1CLibException, data: CardReadersResponse)
        => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, undefined, undefined, callback);
    }

    public readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse)
        => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(true), undefined, callback);
    }

    public readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse)
        => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(false), undefined, callback);
    }

    // sync
    public infoBrowserSync(): BrowserInfoResponse {
        return CoreService.platformInfo();
    }

    public getUrl(): string {
        return this.url;
    }

    public checkGclVersion(client: GCLClient, gclVersion?: string): Promise<CheckGclVersionResponse> {
        return new Promise<CheckGclVersionResponse>((resolve, reject) => {
            client.core().info().then(infoResponse => {
                const installedGclVersion = semver.coerce(infoResponse.data.version);
                let outdated: boolean = semver.ltr(installedGclVersion, gclVersion);
                if (!gclVersion && client.config().gclVersion) {
                    outdated = semver.ltr(installedGclVersion, client.config().gclVersion);
                }
                if (outdated !== undefined && outdated !== null) {
                    if (outdated === true) {
                        resolve(new CheckGclVersionResponse(new CheckGclVersion(outdated, client.config().gclDownloadLink), true));
                    } else {
                        resolve(new CheckGclVersionResponse(new CheckGclVersion(outdated), true));
                    }
                } else {
                    reject(new T1CLibException(412, '701', 'No version to check against was provided', client));
                }
            }, (err) => {
                console.error('Could not receive info', err);
                // TODO check if errorcode is good
                // failure probably because GCL is not installed
                reject(new T1CLibException(500, '700', 'Could not retrieve GCL information', client));

            });
        });
    }

    // get Lib version
    public version(): Promise<string> {
        return Promise.resolve(VERSION);
    }

}
