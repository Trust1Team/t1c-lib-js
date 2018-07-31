/**
 * @author Maarten Somers
 * @since 2017
 */
import {OptionalPin, PinCard} from '../Card';
import {DataObjectResponse, DataResponse} from '../../../core/service/CoreModel';
import {T1CLibException} from '../../../core/exceptions/CoreExceptions';

export interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: T1CLibException, data: OcraAllDataResponse) => void): Promise<OcraAllDataResponse>;

    challenge(body: OcraChallenge, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    readCounter(body: OptionalPin,
                callback?: (error: T1CLibException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse>;
}

export class OcraAllDataResponse extends DataObjectResponse {
    constructor(public data: OcraAllData, public success: boolean) {
        super(data, success);
    }
}

export class OcraAllData {
    constructor(public counter?: string) {
    }
}

export class OcraChallenge extends OptionalPin {
    constructor(public challenge: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

export class OcraReadCounterResponse {
    constructor(public counter?: string, public success?: boolean) {
    }
}
