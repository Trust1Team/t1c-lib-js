/**
 * @author Maarten Somers
 */

import { RestException } from '../../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse,
    CertificatesResponse, DataObjectResponse, DataResponse, T1CCertificate
} from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
import { AuthenticateOrSignData } from '../../Card';

export { AbstractSafeNet, InfoResponse, SafeNetCertificate, SafeNetCertificatesResponse,
    SafeNetSignData, Slot, SlotsResponse, TokenInfo, TokenResponse, SafeNetInfo, Pkcs11VerifySignedData };

interface AbstractSafeNet {
    certificates(slotId: number,
                 options?: Options,
                 callback?: (error: RestException, data: SafeNetCertificatesResponse) => void): Promise<SafeNetCertificatesResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    signData(data: SafeNetSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    token(slotId: number, callback?: (error: RestException, data: TokenResponse) => void): Promise<TokenResponse>;
    verifySignedData(data: Pkcs11VerifySignedData,
                     callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}

class InfoResponse extends DataObjectResponse {
    constructor(public data: SafeNetInfo, public success: boolean) {
        super(data, success);
    }
}

class SafeNetInfo {
    constructor(public cryptoki_version: string,
                public manufacturer_id: string,
                public flags: string,
                public library_description: string,
                public library_version: string) {}
}

class Slot {
    constructor(public slot_id: string,
                public description: string,
                public flags: string,
                public hardware_version: string,
                public firmware_version: string) {}
}

class SlotsResponse extends DataObjectResponse {
    constructor(public data: Slot[], public success: boolean) {
        super(data, success);
    }
}

class SafeNetCertificate extends T1CCertificate {
    constructor(public id: string, public base64: string, public parsed?: object) {
        super(base64, parsed);
    }
}

class SafeNetCertificatesResponse extends CertificatesResponse {
    constructor(public data: SafeNetCertificate[], public success: boolean) {
        super(data, success);
    }
}

class SafeNetSignData extends AuthenticateOrSignData {
    constructor(public slot_id: number,
                public cert_id: string,
                public algorithm_reference: string,
                public data: string,
                public pin?: string,
                public pace?: string) {
        super(pin, pace);
    }
}

class Pkcs11VerifySignedData extends SafeNetSignData {
    constructor(public slot_id: number,
                public cert_id: string,
                public algorithm_reference: string,
                public data: string,
                public signature: string,
                public pin?: string,
                public pace?: string) {
        super(slot_id, cert_id, algorithm_reference, data, pin, pace);
    }
}

class TokenInfo {
    constructor(public slot_id: string,
                public label: string,
                public manufacturer_id: string,
                public model: string,
                public serial_number: string,
                public flags: string,
                public max_session_count: number,
                public session_count: number,
                public max_rw_session_count: number,
                public rw_session_count: number,
                public max_pin_length: number,
                public min_pin_length: number,
                public total_public_memory: number,
                public free_public_memory: number,
                public total_private_memory: number,
                public free_private_memory: number,
                public hardware_version: string,
                public firmware_version: string) {}
}

class TokenResponse extends DataObjectResponse {
    constructor(public data: TokenInfo, public success: boolean) {
        super(data, success);
    }
}
