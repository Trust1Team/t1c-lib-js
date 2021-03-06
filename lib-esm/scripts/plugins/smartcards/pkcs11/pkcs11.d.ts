import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../core/service/CoreModel';
import { LocalConnection } from '../../../core/client/Connection';
import { Options } from '../../../util/RequestHandler';
import { AbstractPkcs11, Pkcs11CertificatesResponse, Pkcs11InfoResponse, Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse } from './pkcs11Model';
export declare class PKCS11 implements AbstractPkcs11 {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    static CONTAINER_NEW_CONTEXT_PATH: string;
    static ALL_CERTIFICATES: string;
    static INFO: string;
    static SIGN: string;
    static SLOTS: string;
    static TOKEN: string;
    private modulePath;
    private os;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    certificates(slotId: string, options?: Options, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(signData: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signDataWithEncryptedPin(signData: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: string, callback: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
    protected containerSuffix(path?: string): string;
}
