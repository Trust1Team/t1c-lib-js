import { DataResponse, T1CResponse } from '../../core/service/CoreModel';
import { T1CLibException } from '../../core/exceptions/CoreExceptions';
export interface AbstractJavaKeyTool {
    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse>;
}
export declare class GenerateKeyPairData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    keyalg?: string;
    sigalg?: string;
    destalias?: string;
    dname?: string;
    startdate?: string;
    ext?: string;
    validity?: number;
    keypass?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, keyalg?: string, sigalg?: string, destalias?: string, dname?: string, startdate?: string, ext?: string, validity?: number, keypass?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class GenerateKeyPairResponse extends T1CResponse {
    data: string;
    success: boolean;
    constructor(data: string, success: boolean);
}
