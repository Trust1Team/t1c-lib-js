/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin, PinCard } from "../Card";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";

interface AbstractOcra extends PinCard {
    // callback-based
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    challenge(body: ChallengeData, callback: (error: RestException, data: DataResponse) => void): void;
    readCounter(body: OptionalPin, callback: (error: RestException, data: ReadCounterResponse) => void): void;

    // promise-based
    // allData(filters: string[]): Promise<AllDataResponse>;
    // challenge(body: ChallengeData): Promise<DataResponse>;
    // readCounter(body: OptionalPin): Promise<ReadCounterResponse>;
}

interface AllDataResponse extends DataObjectResponse {
    data: {
        counter: string
    }
}

interface ChallengeData extends OptionalPin {
    challenge: string
}

interface ReadCounterResponse extends T1CResponse {
    counter: string
}

export { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse };
