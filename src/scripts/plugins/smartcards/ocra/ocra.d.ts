import { GenericPinCard, OptionalPin } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AbstractOcra, ChallengeData, ReadCounterResponse } from "./ocraModel";
export { Ocra };
declare class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE: string;
    static READ_COUNTER: string;
    challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<any>;
    readCounter(body: OptionalPin, callback?: (error: RestException, data: ReadCounterResponse) => void | Promise<ReadCounterResponse>): void | Promise<any>;
}
