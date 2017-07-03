/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { PinCard } from "../Card";
import { DataObjectResponse, DataResponse } from "../../../core/service/CoreModel";

export { AbstractEMV, AllDataResponse };


interface AbstractEMV extends PinCard {
    // callback-based
    pan(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
}

interface AllDataResponse extends DataObjectResponse {
    data: {
        pan: string
    }
}
