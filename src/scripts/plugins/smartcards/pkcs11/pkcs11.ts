import { RestException } from '../../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataResponse } from '../../../core/service/CoreModel';
import { LocalConnection } from '../../../core/client/Connection';
import * as _ from 'lodash';
import { CertParser } from '../../../util/CertParser';
import { ResponseHandler } from '../../../util/ResponseHandler';
import * as platform from 'platform';
import { Options, RequestHandler } from '../../../util/RequestHandler';
import { Promise } from 'es6-promise';
import {
    AbstractPkcs11, InfoResponse, Pkcs11CertificatesResponse,
    Pkcs11SignData, Pkcs11VerifySignedData, SlotsResponse, TokenResponse
} from './pkcs11Model';


/**
 * @author Maarten Somers
 */


export { PKCS11 };

class PKCS11 implements AbstractPkcs11 {
    static ALL_CERTIFICATES = '/certificates';
    static INFO = '/info';
    static SIGN = '/sign';
    static SLOTS = '/slots';
    static TOKEN = '/token';
    static VERIFY = '/verify';
    static DEFAULT_CONFIG = {
        linux: '/usr/local/lib/libeTPkcs11.so',
        mac: '/usr/local/lib/libeTPkcs11.dylib',
        win: 'C:\\Windows\\System32\\eTPKCS11.dll'
    };

    private modulePath;
    private os;


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected moduleConfig?: { linux: string, mac: string, win: string}) {
        // determine os
        if (platform.os.family.indexOf('Win') > -1) { this.os = 'win'; }
        if (platform.os.family.indexOf('OS X') > -1) { this.os = 'mac'; }
        // assume we are dealing with linux ==> will not always be correct!
        if (!this.os) { this.os = 'linux'; }

        if (moduleConfig && moduleConfig[this.os]) { this.modulePath = moduleConfig[this.os]; }
        else { this.modulePath = PKCS11.DEFAULT_CONFIG[this.os]; }
    }

    public certificates(slotId: number,
                        options?: Options,
                        callback?: (error: RestException, data: Pkcs11CertificatesResponse)
                            => void): Promise<Pkcs11CertificatesResponse> {
        let req = _.extend({ slot_id: slotId }, { module: this.modulePath });
        const reqOptions = RequestHandler.determineOptions(options, callback);
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.ALL_CERTIFICATES), req, undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            // if we encounter error try again with default (if possible)
            if (this.moduleConfig) {
                let defaultReq = _.extend({ slot_id: slotId }, { module: PKCS11.DEFAULT_CONFIG[this.os] });
                return this.connection.post(this.baseUrl,
                    this.containerSuffix(PKCS11.ALL_CERTIFICATES), defaultReq, undefined).then(data => {
                    return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
                }, defaultErr => {
                    return ResponseHandler.error(defaultErr, reqOptions.callback);
                });
            } else { return ResponseHandler.error(err, reqOptions.callback); }
        });
    }

    public info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse> {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.INFO), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = { module: PKCS11.DEFAULT_CONFIG[this.os] };
                return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.INFO), defaultReq, undefined, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }

    public signData(signData: Pkcs11SignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        let req = {
            module: this.modulePath,
            id: signData.cert_id,
            slot_id: signData.slot_id,
            pin: signData.pin,
            data: signData.data,
            digest: signData.algorithm_reference
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SIGN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = {
                    module: PKCS11.DEFAULT_CONFIG[this.os],
                    id: signData.cert_id,
                    slot_id: signData.slot_id,
                    pin: signData.pin,
                    data: signData.data,
                    digest: signData.algorithm_reference
                };
                return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SIGN), defaultReq, undefined, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }

    public slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse> {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = { module: PKCS11.DEFAULT_CONFIG[this.os] };
                return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), defaultReq, undefined, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }

    public slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse> {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, { 'token-present': 'true' }).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = { module: PKCS11.DEFAULT_CONFIG[this.os] };
                return this.connection.post(this.baseUrl,
                    this.containerSuffix(PKCS11.SLOTS), defaultReq, { 'token-present': 'true' }, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }

    public token(slotId: number, callback?: (error: RestException, data: TokenResponse) => void): Promise<TokenResponse> {
        let req = _.extend({ slot_id: slotId }, { module: this.modulePath });
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = _.extend({ slot_id: slotId }, { module: PKCS11.DEFAULT_CONFIG[this.os] });
                return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), defaultReq, undefined, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }

    public verifySignedData(verifyData: Pkcs11VerifySignedData,
                            callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        let req = {
            module: this.modulePath,
            id: verifyData.cert_id,
            slot_id: verifyData.slot_id,
            pin: verifyData.pin,
            data: verifyData.data,
            digest: verifyData.algorithm_reference,
            signature: verifyData.signature
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            if (this.moduleConfig) {
                let defaultReq = {
                    module: PKCS11.DEFAULT_CONFIG[this.os],
                    id: verifyData.cert_id,
                    slot_id: verifyData.slot_id,
                    pin: verifyData.pin,
                    data: verifyData.data,
                    digest: verifyData.algorithm_reference,
                    signature: verifyData.signature
                };
                return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), defaultReq, undefined, callback);
            } else { return ResponseHandler.error(err, callback); }
        });
    }


    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        return this.containerUrl + path;
    }
}

