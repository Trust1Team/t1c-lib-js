/**
 * @author Maarten Somers
 * @since 2018
 */
import { LocalAuthConnection } from '../client/Connection';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import {
    AbstractAdmin, AtrListRequest, ContainerSyncRequest, PubKeyResponse,
    SetPubKeyRequest
} from './adminModel';
import { DataArrayResponse, T1CResponse } from '../service/CoreModel';
import { ResponseHandler } from '../../util/ResponseHandler';
import * as _ from 'lodash';
import { GCLClient } from '../GCLLib';
import { InitUtil } from '../../util/InitUtil';
import { RestException } from '../exceptions/CoreExceptions';
import { ClientService } from '../../util/ClientService';

export { AdminService };


const CORE_ACTIVATE = '/admin/activate';
const CORE_ATR_LIST = '/admin/atr';
const CORE_PUB_KEY = '/admin/certificate';
const CORE_CONTAINERS = '/admin/containers';
const CORE_LOGFILE = '/admin/log';

class AdminService implements AbstractAdmin {
    static JWT_ERROR_CODES = [ '200', '201', '202', '203', '204', '205'];

    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {}

    private static errorHandler(error: RestException) {
        // check if the error is JWT related
        if (error && error.status === 401 && _.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            // error is JWT related, re-run the authorisation flow
            return InitUtil.initializeLibrary(ClientService.getClient());
        } else {
            // else error is not JWT related, pass it along
            return Promise.reject(error);
        }
    }

    public activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_ACTIVATE, {}, callback);
    }

    public atr(atrList: AtrListRequest, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_ATR_LIST, atrList, callback);
    }

    public getLogfile(name: string, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.getLogFile(this.url, CORE_LOGFILE + '/' + name, callback);
    }

    public getLogfileList(callback?: (error: CoreExceptions.RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.get(this.url, CORE_LOGFILE, callback);
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse)
        => void): Promise<PubKeyResponse> {
        return this.get(this.url, CORE_PUB_KEY, callback);
    }

    public setPubKey(keys: SetPubKeyRequest,
                     callback?: (error: CoreExceptions.RestException, data: PubKeyResponse)
                         => void): Promise<PubKeyResponse> {
        return this.put(this.url, CORE_PUB_KEY, keys, callback);
    }

    // TODO implementation check
    public updateContainerConfig(containers: ContainerSyncRequest,
                                 callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_CONTAINERS, containers, callback);
    }


    // private methods
    // ===============
    private get(url: string, suffix: string, callback?: any) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.get(url, suffix, undefined).then(result => {
                resolve(ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    // retry initial request
                    self.connection.get(url, suffix, undefined).then(retryResult => {
                        resolve(ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler.error(retryError, callback));
                });
            });
        });
    }

    private getLogFile(url: string, suffix: string, callback?: any) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.requestLogFile(url, suffix).then(result => {
                resolve(ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    // retry initial request
                    self.connection.requestLogFile(url, suffix).then(retryResult => {
                        resolve(ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler.error(retryError, callback));
                });
            });
        });
    }

    private post(url: string, suffix: string, body: any, callback?: any) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.post(url, suffix, body, undefined).then(result => {
                resolve(ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    // retry initial request
                    self.connection.post(url, suffix, body, undefined).then(retryResult => {
                        resolve(ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler.error(retryError, callback));
                });
            });
        });
    }

    private put(url: string, suffix: string, body: any, callback?: any) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.put(url, suffix, body, undefined).then(result => {
                resolve(ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    // retry initial request
                    self.connection.put(url, suffix, body, undefined).then(retryResult => {
                        resolve(ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
}
