import { RestException } from '../../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataResponse } from '../../../core/service/CoreModel';
import { LocalConnection } from '../../../core/client/Connection';
import { Options } from '../../../util/RequestHandler';
import { AbstractPkcs11, Pkcs11CertificatesResponse, Pkcs11InfoResponse, Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse, Pkcs11VerifySignedData } from './pkcs11Model';
export declare class PKCS11 implements AbstractPkcs11 {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    static ALL_CERTIFICATES: string;
    static INFO: string;
    static SIGN: string;
    static SLOTS: string;
    static TOKEN: string;
    static VERIFY: string;
    private modulePath;
    private os;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    certificates(slotId: number, options?: Options, callback?: (error: RestException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: RestException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(signData: Pkcs11SignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: number, callback: (error: RestException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
    verifySignedData(verifyData: Pkcs11VerifySignedData, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    protected containerSuffix(path?: string): string;
}