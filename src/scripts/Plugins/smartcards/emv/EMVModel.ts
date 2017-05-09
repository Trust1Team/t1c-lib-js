/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { OptionalPin } from "../Card";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";

interface AbstractEMV {
    // callback-based
    pan(callback: (error: RestException, data: DataResponse) => void): void;
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;

    // promise-based
    // pan(): Promise<DataResponse>;
    // allData(filters: string[]): Promise<AllDataResponse>;
    // verifyPin(body: OptionalPin): Promise<T1CResponse>;
}

interface AllDataResponse extends T1CResponse {
    data: {
        pan: string
    }
}

export { AbstractEMV, AllDataResponse };
