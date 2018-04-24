import { RestException } from '../../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataResponse } from '../../../core/service/CoreModel';
import { LocalConnection } from '../../../core/client/Connection';
import { Options } from '../../../util/RequestHandler';
import { AbstractPkcs11, InfoResponse, Pkcs11CertificatesResponse, Pkcs11SignData, Pkcs11VerifySignedData, SlotsResponse, TokenResponse } from './pkcs11Model';
export { PKCS11 };
declare class PKCS11 implements AbstractPkcs11 {
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
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    signData(signData: Pkcs11SignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    token(slotId: number, callback: (error: RestException, data: TokenResponse) => void): Promise<TokenResponse>;
    verifySignedData(verifyData: Pkcs11VerifySignedData, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    protected containerSuffix(path?: string): string;
}
