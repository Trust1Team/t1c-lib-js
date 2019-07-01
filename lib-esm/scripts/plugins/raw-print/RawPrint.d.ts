import { T1CLibException } from '../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataArrayResponse } from '../../core/service/CoreModel';
import { GenericContainer } from '../GenericContainer';
import { AbstractRawPrint, RawPrintPrintRequest } from './RawPrintModel';
export declare class RawPrint extends GenericContainer implements AbstractRawPrint {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, runInUserSpace: boolean);
    list(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    print(body: RawPrintPrintRequest, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
