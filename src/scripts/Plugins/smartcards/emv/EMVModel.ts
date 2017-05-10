/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { OptionalPin, PinCard } from "../Card";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";

interface AbstractEMV extends PinCard {
    // callback-based
    pan(callback: (error: RestException, data: DataResponse) => void): void;
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;

    // promise-based
    // pan(): Promise<DataResponse>;
    // allData(filters: string[]): Promise<AllDataResponse>;
}

interface AllDataResponse extends T1CResponse {
    data: {
        pan: string
    }
}

export { AbstractEMV, AllDataResponse };
