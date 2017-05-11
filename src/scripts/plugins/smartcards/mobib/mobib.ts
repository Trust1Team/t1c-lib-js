/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractMobib, CardIssuingResponse, ContractsResponse, StatusResponse } from "./mobibModel";
import { GenericSmartCard } from "../Card";

export { Mobib };


const MOBIB_CARD_ISSUING = "/card-issuing";
const MOBIB_CONTRACTS = "/contracts";
const MOBIB_PHOTO = "/picture";
const MOBIB_STATUS = "/status";

class Mobib extends GenericSmartCard implements AbstractMobib {

    public cardIssuing(callback: (error: RestException, data: CardIssuingResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CARD_ISSUING, undefined, callback);
    }

    public contracts(callback: (error: RestException, data: ContractsResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CONTRACTS, undefined, callback);
    }

    public picture(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_PHOTO, undefined, callback);
    }

    public status(callback: (error: RestException, data: StatusResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_STATUS, undefined, callback);
    }
}
