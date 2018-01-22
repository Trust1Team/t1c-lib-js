/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin, PinCard } from "../Card";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";

export { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse };


interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin,
                callback?: (error: RestException, data: ReadCounterResponse) => void): Promise<ReadCounterResponse>;
}

interface AllDataResponse extends DataObjectResponse {
    data: {
        counter: string
    }
}

class ChallengeData extends OptionalPin {
    constructor(public challenge: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

interface ReadCounterResponse extends T1CResponse {
    counter: string
}
