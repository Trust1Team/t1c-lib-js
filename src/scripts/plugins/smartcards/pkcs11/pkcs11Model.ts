/**
 * @author Maarten Somers
 */

import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse,
    CertificatesResponse, DataObjectResponse, DataResponse, T1CCertificate
} from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';
import { AuthenticateOrSignData } from '../Card';


export interface AbstractPkcs11 {
    certificates(slotId: string,
                 options?: Options,
                 callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(data: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
}

export class Pkcs11InfoResponse extends DataObjectResponse {
    constructor(public data: Pkcs11Info, public success: boolean) {
        super(data, success);
    }
}

export class Pkcs11Info {
    constructor(public cryptoki_version: string,
                public manufacturer_id: string,
                public flags: string,
                public library_description: string,
                public library_version: string) {}
}

export class Pkcs11Slot {
    constructor(public slot_id: string,
                public description: string,
                public flags: number,
                public hardware_version: string,
                public firmware_version: string) {}
}

export class Pkcs11SlotsResponse extends DataObjectResponse {
    constructor(public data: Pkcs11Slot[], public success: boolean) {
        super(data, success);
    }
}

export class Pkcs11Certificate extends T1CCertificate {
    constructor(public id: string, public base64: string, public parsed?: object) {
        super(base64, id, parsed);
    }
}

export class Pkcs11CertificatesResponse extends CertificatesResponse {
    constructor(public data: Pkcs11Certificate[], public success: boolean) {
        super(data, success);
    }
}

export class Pkcs11SignData extends AuthenticateOrSignData {
    constructor(public slot_id: string,
                public cert_id: string,
                public algorithm_reference: string,
                public data: string,
                public pin?: string,
                public pace?: string) {
        super(pin, pace);
    }
}

export class Pkcs11VerifySignedData extends Pkcs11SignData {
    constructor(public slot_id: string,
                public cert_id: string,
                public algorithm_reference: string,
                public data: string,
                public signature: string,
                public pin?: string,
                public pace?: string) {
        super(slot_id, cert_id, algorithm_reference, data, pin, pace);
    }
}

export class Pkcs11TokenInfo {
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

export class Pkcs11TokenResponse extends DataObjectResponse {
    constructor(public data: Pkcs11TokenInfo, public success: boolean) {
        super(data, success);
    }
}

export class Pkcs11ModuleConfig {
    constructor(public linux: string, public mac: string, public win: string) {}
}
