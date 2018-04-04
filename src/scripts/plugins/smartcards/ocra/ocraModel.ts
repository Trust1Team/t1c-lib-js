/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin, PinCard } from '../Card';
import { DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';

export { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse, AllOcraData };


interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin,
                callback?: (error: RestException, data: ReadCounterResponse) => void): Promise<ReadCounterResponse>;
}

class AllDataResponse extends DataObjectResponse {
    constructor(public data: AllOcraData, public success: boolean) {
        super(data, success);
    }
}

class AllOcraData {
    constructor(public counter: string) {}
}

class ChallengeData extends OptionalPin {
    constructor(public challenge: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

class ReadCounterResponse {
    constructor(public counter: string, public success: boolean) {}
}
