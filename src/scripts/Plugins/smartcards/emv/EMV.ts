/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import { AbstractEMV, AllDataResponse } from "./EMVModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericPinCard } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";

const EMV_PAN = "/pan";

class EMV extends GenericPinCard implements AbstractEMV {
    CONTAINER_CONTEXT = "/plugins/emv";

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI(), callback, GenericPinCard.createFilterQueryParam(filters));
        } else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public pan(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + EMV_PAN, callback);
    }
}
export { EMV };
