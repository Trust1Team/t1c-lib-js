/**
 * @author Maarten Somers
 */

import { RestException } from '../../../../core/exceptions/CoreExceptions';
import {
    CertificatesResponse, DataResponse, T1CCertificate,
    T1CResponse
} from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
import { AuthenticateOrSignData } from '../../Card';

export { AbstractSafeNet, InfoResponse, SafeNetCertificate, SafeNetCertificatesResponse,
    SafeNetSignData, Slot, SlotsResponse, TokenInfo, TokensResponse };

interface AbstractSafeNet {
    certificates(slotId: number,
                 options?: Options,
                 callback?: (error: RestException, data: SafeNetCertificatesResponse) => void): Promise<SafeNetCertificatesResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    signData(data: SafeNetSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    tokens(callback?: (error: RestException, data: TokensResponse) => void): Promise<TokensResponse>;
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
    flags: string
    hardware_version: string
    firmware_version: string
}

interface SlotsResponse extends T1CResponse {
    data: Slot[]
}

interface SafeNetCertificate extends T1CCertificate {
    id: string
}

interface SafeNetCertificatesResponse extends CertificatesResponse {
    data: SafeNetCertificate[]
}

interface SafeNetSignData extends AuthenticateOrSignData {
    slot_id: number
    cert_id: string
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

interface TokensResponse extends T1CResponse {
    data: TokenInfo[]
}