/**
 * @author Maarten Somers
 * @since 2017
 */
import { OptionalPin, PinCard } from "../Card";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import * as Bluebird from 'bluebird';

export { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse };


interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    readCounter(body: OptionalPin,
                callback?: (error: RestException, data: ReadCounterResponse) => void): Bluebird<ReadCounterResponse>;
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
