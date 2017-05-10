/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractMobib, AllDataResponse, CardIssuingResponse, ContractsResponse, StatusResponse } from "./mobibModel";
import { GenericCard } from "../Card";

const MOBIB_CARD_ISSUING = "/card-issuing";
const MOBIB_CONTRACTS = "/contracts";
const MOBIB_PHOTO = "/picture";
const MOBIB_STATUS = "/status";

class Mobib extends GenericCard implements AbstractMobib {

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI(), callback, GenericCard.createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public cardIssuing(callback: (error: RestException, data: CardIssuingResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CARD_ISSUING, callback);
    }

    public contracts(callback: (error: RestException, data: ContractsResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CONTRACTS, callback);
    }

    public picture(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_PHOTO, callback);
    }


    public status(callback: (error: RestException, data: StatusResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_STATUS, callback);
    }
}

export { Mobib };
