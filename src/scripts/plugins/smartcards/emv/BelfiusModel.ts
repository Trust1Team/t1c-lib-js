/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataObject, DataResponse, T1CResponse } from "../../../core/service/CoreModel";

export { AbstractBelfius };


interface AbstractBelfius {
    // callback-based
    openSession(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    command(data: DataObject, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    stx(data: DataObject, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    closeSession(callback?: (error: RestException, data: T1CResponse) => void): void | Promise<T1CResponse>;
}

