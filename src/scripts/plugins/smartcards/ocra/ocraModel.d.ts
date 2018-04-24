import { OptionalPin, PinCard } from '../Card';
import { DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
export { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse, AllOcraData };
interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin, callback?: (error: RestException, data: ReadCounterResponse) => void): Promise<ReadCounterResponse>;
}
declare class AllDataResponse extends DataObjectResponse {
    data: AllOcraData;
    success: boolean;
    constructor(data: AllOcraData, success: boolean);
}
declare class AllOcraData {
    counter: string;
    constructor(counter: string);
}
declare class ChallengeData extends OptionalPin {
    challenge: string;
    pin: string;
    pace: string;
    constructor(challenge: string, pin?: string, pace?: string);
}
declare class ReadCounterResponse {
    counter: string;
    success: boolean;
    constructor(counter: string, success: boolean);
}
