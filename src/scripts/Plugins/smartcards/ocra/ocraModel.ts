/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin } from "../Card";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";

interface AbstractOcra {
    // callback-based
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    challenge(body: ChallengeData, callback: (error: RestException, data: DataResponse) => void): void;
    readCounter(body: OptionalPin, callback: (error: RestException, data: ReadCounterResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;

    // promise-based
    // allData(filters: string[]): Promise<AllDataResponse>;
    // challenge(body: ChallengeData): Promise<DataResponse>;
    // readCounter(body: OptionalPin): Promise<ReadCounterResponse>;
    // verifyPin(body: OptionalPin): Promise<T1CResponse>;
}

interface AllDataResponse extends T1CResponse {
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
