import { T1CLibException } from '../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataArrayResponse } from '../../core/service/CoreModel'

export interface AbstractRawPrint {
    list(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    print(name: string, job: string, data: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
