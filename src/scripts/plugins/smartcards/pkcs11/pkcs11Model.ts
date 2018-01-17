/**
 * @author Maarten Somers
 */

import { RestException } from '../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse,
    CertificatesResponse, DataResponse, T1CCertificate,
    T1CResponse
} from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';
import { AuthenticateOrSignData } from '../Card';

export { AbstractPkcs11, InfoResponse, Pkcs11Certificate, Pkcs11CertificatesResponse,
    Pkcs11SignData, Pkcs11VerifySignedData, Slot, SlotsResponse, TokenInfo, TokenResponse };

interface AbstractPkcs11 {
    certificates(slotId: number,
                 options?: Options,
                 callback?: (error: RestException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    signData(data: Pkcs11SignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    token(slotId: number, callback?: (error: RestException, data: TokenResponse) => void): Promise<TokenResponse>;
    verifySignedData(data: Pkcs11VerifySignedData,
                     callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}


interface InfoResponse extends T1CResponse {
    data: {
        cryptoki_version: string
        manufacturer_id: string
        flags: string
        library_description: string
        library_version: string
    }
}

interface Slot {
    slot_id: string
    description: string
    flags: number
    hardware_version: string
    firmware_version: string
}

interface SlotsResponse extends T1CResponse {
    data: Slot[]
}

interface Pkcs11Certificate extends T1CCertificate {
    id: string
}

interface Pkcs11CertificatesResponse extends CertificatesResponse {
    data: Pkcs11Certificate[]
}

interface Pkcs11SignData extends AuthenticateOrSignData {
    slot_id: number
    cert_id: string
}

interface Pkcs11VerifySignedData extends Pkcs11SignData {
    signature: string
}

interface TokenInfo {
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
}

interface TokenResponse extends T1CResponse {
    data: TokenInfo
}
