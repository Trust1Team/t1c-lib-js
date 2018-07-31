import { GenericPinCard, OptionalPin } from '../Card';
import { DataResponse } from '../../../core/service/CoreModel';
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { AbstractOcra, OcraChallenge, OcraReadCounterResponse } from './ocraModel';
import { LocalConnection } from '../../../core/client/Connection';
export declare class Ocra extends GenericPinCard implements AbstractOcra {
    static CONTAINER_PREFIX: string;
    static CHALLENGE: string;
    static READ_COUNTER: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    challenge(body: OcraChallenge, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin, callback?: (error: T1CLibException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse>;
}
