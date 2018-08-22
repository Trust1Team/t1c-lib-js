import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataResponse} from '../../../core/service/CoreModel';
import {LocalConnection} from '../../../core/client/Connection';
import {CertParser} from '../../../util/CertParser';
import {ResponseHandler} from '../../../util/ResponseHandler';
import * as platform from 'platform';
import {Options, RequestHandler} from '../../../util/RequestHandler';
import {
    AbstractPkcs11, Pkcs11CertificatesResponse, Pkcs11InfoResponse,
    Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse, Pkcs11VerifySignedData
} from './pkcs11Model';
import {PinEnforcer} from '../../../util/PinEnforcer';
import {ActivatedContainerUtil} from '../../../util/ActivatedContainerUtil';

/**
 * @author Maarten Somers
 * @author Michallis Pashidis
 */

export class PKCS11 implements AbstractPkcs11 {

    static CONTAINER_NEW_CONTEXT_PATH = '/containers/';

    static ALL_CERTIFICATES = '/certificates';
    static INFO = '/info';
    static SIGN = '/sign';
    static SLOTS = '/slots';
    static TOKEN = '/token';
    static VERIFY = '/verify';
    // static DEFAULT_CONFIG = {
    //     linux: '/usr/local/lib/libeTPkcs11.so',
    //     mac: '/Library/cv cryptovision/libcvP11.dylib',
    //     win: 'C:\\Windows\\System32\\eTPKCS11.dll'
    // };

    private modulePath;
    private os;


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {
        // determine os
        if (platform.os.family) {
            if (platform.os.family.indexOf('Win') > -1) {
                this.os = 'win';
            }
            if (platform.os.family.indexOf('OS X') > -1) {
                this.os = 'mac';
            }
            // assume we are dealing with linux ==> will not always be correct!
            if (!this.os) {
                this.os = 'linux';
            }
        }
        // default if unknown or not provided
        else {
            this.os = 'win';
        }


        const moduleConfig = connection.cfg.pkcs11Config;
        if (moduleConfig && moduleConfig[this.os]) {
            this.modulePath = moduleConfig[this.os];
        }
    }

    public certificates(slotId: string,
                        options?: Options,
                        callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse)
                            => void): Promise<Pkcs11CertificatesResponse> {
        let req = Object.assign({slot_id: slotId}, {module: this.modulePath});
        const reqOptions = RequestHandler.determineOptions(options, callback);
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.ALL_CERTIFICATES), req, undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }

    public info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.INFO), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public signData(signData: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        let req = {
            module: this.modulePath,
            id: signData.cert_id,
            slot_id: signData.slot_id,
            pin: PinEnforcer.encryptPin(signData.pin),
            data: signData.data,
            digest: signData.algorithm_reference,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SIGN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, {'token-present': 'true'}).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public token(slotId: string, callback: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse> {
        let req = Object.assign({slot_id: slotId}, {module: this.modulePath});
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public verifySignedData(verifyData: Pkcs11VerifySignedData,
                            callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        let req = {
            module: this.modulePath,
            id: verifyData.cert_id,
            slot_id: verifyData.slot_id,
            pin: PinEnforcer.encryptPin(verifyData.pin),
            data: verifyData.data,
            digest: verifyData.algorithm_reference,
            signature: verifyData.signature,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.VERIFY), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    // resolves the reader_id and container version in the base URL
    protected containerSuffix(path?: string): string {
        const containername: string = ActivatedContainerUtil.getContainerFor(this.connection.cfg, 'pkcs11');
        this.containerUrl = PKCS11.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            return this.containerUrl + path;
        }
        else {
            return this.containerUrl;
        }
    }
}

