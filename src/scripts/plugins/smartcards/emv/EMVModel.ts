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
    pan(callback: (error: RestException, data: DataResponse) => void): void;
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;

    // promise-based
    // pan(): Promise<DataResponse>;
    // allData(filters: string[]): Promise<AllDataResponse>;
}

interface AllDataResponse extends DataObjectResponse {
    data: {
        pan: string
    }
}
