/**
 * @author Maarten Somers
 */

import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificatesResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { Options } from "../../../../util/RequestHandler";

export { AbstractSafeNet, InfoResponse, Slot, SlotsResponse, TokenInfo, TokenInfoResponse };

interface AbstractSafeNet {
    certificates(slotId: number,
                 options?: Options,
                 callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    tokenInfo(slotId: number, callback?: (error: RestException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
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

interface TokenInfoResponse extends T1CResponse {
    data: TokenInfo
}