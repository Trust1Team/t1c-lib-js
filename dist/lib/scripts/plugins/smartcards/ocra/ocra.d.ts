import { GenericPinCard, OptionalPin } from '../Card';
import { DataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { AbstractOcra, OcraChallenge, OcraReadCounterResponse } from './ocraModel';
export declare class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE: string;
    static READ_COUNTER: string;
    challenge(body: OcraChallenge, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin, callback?: (error: RestException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse>;
}
