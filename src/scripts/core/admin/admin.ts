/**
 * @author Michallis Pashidis
 * @since 2018
 */
import {LocalAdminConnection, LocalAuthAdminConnection} from '../client/Connection';
import {
    AbstractAdmin, AtrListRequest, ContainerSyncRequest, PubKeyResponse, ResolvedAgent, ResolvedAgentResponse,
    SetPubKeyRequest
} from './adminModel';
import {DataArrayResponse, T1CResponse} from '../service/CoreModel';
import { ResponseHandler } from '../../util/ResponseHandler';
import * as lodash from 'lodash';
import { InitUtil } from '../../util/InitUtil';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { ClientService } from '../../util/ClientService';


const CORE_ACTIVATE = '/admin/activate';
const CORE_ATR_LIST = '/admin/atr';
const CORE_PUB_KEY = '/admin/certificate';
const CORE_CONTAINERS = '/admin/containers';
const CORE_LOGFILE = '/admin/log';
const CORE_AGENT_RESOLVE = '/agent/resolve';

/**
 * Provides access to the /admin endpoints
 * All calls wil be automatically retried if a JWT related error is encountered
 */
export class AdminService implements AbstractAdmin {
    static JWT_ERROR_CODES = [ '200', '201', '202', '203', '204', '205'];

    /**
     * Constructor
     * The noAuthConnection's only purpose is to get the device certificates, which are unprotected
     * @param url
     * @param connection
     * @param noAuthConnection
     */
    constructor(private url: string, private connection: LocalAuthAdminConnection, private noAuthConnection: LocalAdminConnection) {}

    private static errorHandler(error: T1CLibException) {
        // check if the error is JWT related
        if (error && error.status === 401 && lodash.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            // error is JWT related, re-run the authorisation flow
            return InitUtil.initializeLibrary(ClientService.getClient());
        } else {
            // else error is not JWT related, pass it along
            return Promise.reject(error);
        }
    }

    public activate(callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_ACTIVATE, {}, callback);
    }

    public atr(atrList: AtrListRequest, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_ATR_LIST, atrList, callback);
    }

    public getLogfile(name: string, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.getLogFile(this.url, CORE_LOGFILE + '/' + name, callback);
    }

    public getLogfileList(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.getLogfiles(this.url, CORE_LOGFILE, callback);
    }

    public getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse)
        => void): Promise<PubKeyResponse> {
        return this.getPubKeys(this.url, CORE_PUB_KEY, callback);
    }

    public setPubKey(keys: SetPubKeyRequest,
                     callback?: (error: T1CLibException, data: PubKeyResponse)
                         => void): Promise<PubKeyResponse> {
        return this.put(this.url, CORE_PUB_KEY, keys, callback);
    }

    public updateContainerConfig(containers: ContainerSyncRequest,
                                 callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.post(this.url, CORE_CONTAINERS, containers, callback);
    }

    // resolve Agent for citrix environment
    public resolveAgent (challenge: string, callback?: (error: T1CLibException, data: ResolvedAgentResponse) => void): Promise<ResolvedAgentResponse> {
        console.log('resolve agent url: ' + this.url);
        return this.connection.post(this.url, CORE_AGENT_RESOLVE, { challenge }, [], undefined, callback);
    }

    // private methods
    // ===============
    private getLogfiles(url: string, suffix: string, callback?: any): Promise<DataArrayResponse> {
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

    private getPubKeys(url: string, suffix: string, callback?: any): Promise<PubKeyResponse> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.noAuthConnection.get(url, suffix, undefined).then(result => {
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

    private getLogFile(url: string, suffix: string, callback?: any): Promise<T1CResponse> {
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

    private post(url: string, suffix: string, body: any, callback?: any): Promise<T1CResponse> {
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

    private put(url: string, suffix: string, body: any, callback?: any): Promise<T1CResponse> {
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
