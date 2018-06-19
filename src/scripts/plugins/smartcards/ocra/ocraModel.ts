/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin, PinCard } from '../Card';
import { DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';

export { AbstractOcra, AllDataResponse, OcraChallenge, OcraReadCounterResponse, OcraAllData };


interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    challenge(body: OcraChallenge, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin,
                callback?: (error: RestException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse>;
}

class AllDataResponse extends DataObjectResponse {
    constructor(public data: OcraAllData, public success: boolean) {
        super(data, success);
    }
}

class OcraAllData {
    constructor(public counter?: string) {}
}

class OcraChallenge extends OptionalPin {
    constructor(public challenge: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

class OcraReadCounterResponse {
    constructor(public counter?: string, public success?: boolean) {}
}
