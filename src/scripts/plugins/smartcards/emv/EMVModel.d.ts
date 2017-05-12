import { RestException } from "../../../core/exceptions/CoreExceptions";
import { PinCard } from "../Card";
import { DataObjectResponse, DataResponse } from "../../../core/service/CoreModel";
export { AbstractEMV, AllDataResponse };
interface AbstractEMV extends PinCard {
    pan(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): void | Promise<AllDataResponse>;
}
interface AllDataResponse extends DataObjectResponse {
    data: {
        pan: string;
    };
}
