/**
 * @author Maarten Somers
 */

import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificatesResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { Options } from "../../../../util/RequestHandler";

export { AbstractSafeNet, InfoResponse, Slot, SlotsResponse };

interface AbstractSafeNet {
    certificates(slotId: number,
                 options?: Options,
                 callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    slots(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
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