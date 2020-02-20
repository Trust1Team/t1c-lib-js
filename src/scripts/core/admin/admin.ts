import {LocalAdminConnection, LocalAuthAdminConnection} from '../client/Connection';
import { AbstractAdmin, PubKeyResponse} from './adminModel';
import { ResponseHandler } from '../../util/ResponseHandler';
import { InitUtil } from '../../util/InitUtil';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { ClientService } from '../../util/ClientService';
import {Util} from '../../util/Utils';


const CORE_PUB_KEY = '/admin/certificate/device';


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
        if (error && error.status === 401 && Util.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            // error is JWT related, re-run the authorisation flow
            return InitUtil.initializeLibrary(ClientService.getClient());
        } else {
            // else error is not JWT related, pass it along
            return Promise.reject(error);
        }
    }

    public getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse)
        => void): Promise<PubKeyResponse> {
        return this.getPubKeys(this.url, CORE_PUB_KEY, callback);
    }

    // private methods
    // ===============

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
}
