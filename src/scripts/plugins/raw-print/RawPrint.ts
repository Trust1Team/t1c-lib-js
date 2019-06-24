import {T1CLibException} from '../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataArrayResponse } from '../../core/service/CoreModel';
import {GenericContainer} from '../GenericContainer';
import {AbstractRawPrint} from './RawPrintModel';

const RAWPRINT_LIST = '/list';
const RAWPRINT_PRINT = '/print';

export class RawPrint extends GenericContainer implements AbstractRawPrint {
    static CONTAINER_PREFIX = 'rawprint';

    constructor(baseUrl: string, containerUrl: string, connection: any, runInUserSpace: boolean) {
        super(baseUrl, containerUrl, connection, RawPrint.CONTAINER_PREFIX, runInUserSpace);
    }

    public list(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RAWPRINT_LIST), undefined, undefined, callback);
    }

    public print(name: string, job: string, data: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(RAWPRINT_PRINT), undefined, undefined, callback);
    }
}
