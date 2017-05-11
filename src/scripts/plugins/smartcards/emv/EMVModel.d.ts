import { RestException } from "../../../core/exceptions/CoreExceptions";
import { PinCard } from "../Card";
import { DataObjectResponse, DataResponse } from "../../../core/service/CoreModel";
export { AbstractEMV, AllDataResponse };
interface AbstractEMV extends PinCard {
    pan(callback: (error: RestException, data: DataResponse) => void): void;
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
}
interface AllDataResponse extends DataObjectResponse {
    data: {
        pan: string;
    };
}
