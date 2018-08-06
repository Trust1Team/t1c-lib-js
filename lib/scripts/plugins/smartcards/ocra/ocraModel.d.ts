import { OptionalPin, PinCard } from '../Card';
import { DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
export interface AbstractOcra extends PinCard {
    allData(filters: string[], callback?: (error: T1CLibException, data: OcraAllDataResponse) => void): Promise<OcraAllDataResponse>;
    challenge(body: OcraChallenge, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    readCounter(body: OptionalPin, callback?: (error: T1CLibException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse>;
}
export declare class OcraAllDataResponse extends DataObjectResponse {
    data: OcraAllData;
    success: boolean;
    constructor(data: OcraAllData, success: boolean);
}
export declare class OcraAllData {
    counter?: string;
    constructor(counter?: string);
}
export declare class OcraChallenge extends OptionalPin {
    challenge: string;
    pin?: string;
    pace?: string;
    constructor(challenge: string, pin?: string, pace?: string);
}
export declare class OcraReadCounterResponse {
    counter?: string;
    success?: boolean;
    constructor(counter?: string, success?: boolean);
}
