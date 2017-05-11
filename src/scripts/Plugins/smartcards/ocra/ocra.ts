/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericPinCard, OptionalPin } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AbstractOcra, ChallengeData, ReadCounterResponse } from "./ocraModel";


class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE = "/challenge";
    static READ_COUNTER = "/read-counter";

    public challenge(body: ChallengeData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + Ocra.CHALLENGE, body, callback);
    }

    public readCounter(body: OptionalPin, callback: (error: RestException, data: ReadCounterResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + Ocra.READ_COUNTER, body, callback);
    }
}

export { Ocra };
