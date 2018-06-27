import { RestException } from '../../../core/exceptions/CoreExceptions';
import { BoolDataResponse, CertificatesResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';
import { AuthenticateOrSignData } from '../Card';
export interface AbstractPkcs11 {
    certificates(slotId: number, options?: Options, callback?: (error: RestException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: RestException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(data: Pkcs11SignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: number, callback?: (error: RestException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
    verifySignedData(data: Pkcs11VerifySignedData, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
export declare class Pkcs11InfoResponse extends DataObjectResponse {
    data: Pkcs11Info;
    success: boolean;
    constructor(data: Pkcs11Info, success: boolean);
}
export declare class Pkcs11Info {
    cryptoki_version: string;
    manufacturer_id: string;
    flags: string;
    library_description: string;
    library_version: string;
    constructor(cryptoki_version: string, manufacturer_id: string, flags: string, library_description: string, library_version: string);
}
export declare class Pkcs11Slot {
    slot_id: string;
    description: string;
    flags: number;
    hardware_version: string;
    firmware_version: string;
    constructor(slot_id: string, description: string, flags: number, hardware_version: string, firmware_version: string);
}
export declare class Pkcs11SlotsResponse extends DataObjectResponse {
    data: Pkcs11Slot[];
    success: boolean;
    constructor(data: Pkcs11Slot[], success: boolean);
}
export declare class Pkcs11Certificate extends T1CCertificate {
    id: string;
    base64: string;
    parsed: object;
    constructor(id: string, base64: string, parsed?: object);
}
export declare class Pkcs11CertificatesResponse extends CertificatesResponse {
    data: Pkcs11Certificate[];
    success: boolean;
    constructor(data: Pkcs11Certificate[], success: boolean);
}
export declare class Pkcs11SignData extends AuthenticateOrSignData {
    slot_id: number;
    cert_id: string;
    algorithm_reference: string;
    data: string;
    pin: string;
    pace: string;
    constructor(slot_id: number, cert_id: string, algorithm_reference: string, data: string, pin?: string, pace?: string);
}
export declare class Pkcs11VerifySignedData extends Pkcs11SignData {
    slot_id: number;
    cert_id: string;
    algorithm_reference: string;
    data: string;
    signature: string;
    pin: string;
    pace: string;
    constructor(slot_id: number, cert_id: string, algorithm_reference: string, data: string, signature: string, pin?: string, pace?: string);
}
export declare class Pkcs11TokenInfo {
    slot_id: string;
    label: string;
    manufacturer_id: string;
    model: string;
    serial_number: string;
    flags: string;
    max_session_count: number;
    session_count: number;
    max_rw_session_count: number;
    rw_session_count: number;
    max_pin_length: number;
    min_pin_length: number;
    total_public_memory: number;
    free_public_memory: number;
    total_private_memory: number;
    free_private_memory: number;
    hardware_version: string;
    firmware_version: string;
    constructor(slot_id: string, label: string, manufacturer_id: string, model: string, serial_number: string, flags: string, max_session_count: number, session_count: number, max_rw_session_count: number, rw_session_count: number, max_pin_length: number, min_pin_length: number, total_public_memory: number, free_public_memory: number, total_private_memory: number, free_private_memory: number, hardware_version: string, firmware_version: string);
}
export declare class Pkcs11TokenResponse extends DataObjectResponse {
    data: Pkcs11TokenInfo;
    success: boolean;
    constructor(data: Pkcs11TokenInfo, success: boolean);
}
export declare class Pkcs11ModuleConfig {
    linux: string;
    mac: string;
    win: string;
    constructor(linux: string, mac: string, win: string);
}
