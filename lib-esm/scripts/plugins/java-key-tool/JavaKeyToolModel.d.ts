import { DataResponse, T1CResponse } from '../../core/service/CoreModel';
import { T1CLibException } from '../../core/exceptions/CoreExceptions';
export interface AbstractJavaKeyTool {
    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse>;
    GenerateCertificateRequest(body: CSRData, callback?: (error: T1CLibException, data: CSRResponse) => void): Promise<DataResponse>;
    ImportCertificate(body: ImportCertData, callback?: (error: T1CLibException, data: ImportCertResponse) => void): Promise<DataResponse>;
    ExportCertificate(body: ExportCertData, callback?: (error: T1CLibException, data: ExportCertResponse) => void): Promise<DataResponse>;
    ChangeKeystorePassword(body: ChangeKeystorePasswordData, callback?: (error: T1CLibException, data: ChangeKeystorePasswordResponse) => void): Promise<DataResponse>;
    ChangeKeyPassword(body: ChangeKeyPasswordData, callback?: (error: T1CLibException, data: ChangeKeyPasswordResponse) => void): Promise<DataResponse>;
    ChangeAlias(body: ChangeAliasData, callback?: (error: T1CLibException, data: ChangeAliasResponse) => void): Promise<DataResponse>;
    ListEntries(body: ListEntriesData, callback?: (error: T1CLibException, data: ListEntriesResponse) => void): Promise<DataResponse>;
    DeleteEntry(body: DeleteEntryData, callback?: (error: T1CLibException, data: DeleteEntryResponse) => void): Promise<DataResponse>;
}
export declare class DeleteEntryData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class DeleteEntryResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class ListEntriesData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ListEntriesResponse extends T1CResponse {
    data: StoreEntry[];
    success: boolean;
    constructor(data: StoreEntry[], success: boolean);
}
export declare class StoreEntry {
    alias: string;
    constructor(alias: string, base64: string);
}
export declare class ChangeAliasData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    destalias?: string;
    keypass?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, destalias?: string, keypass?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ChangeAliasResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class ChangeKeyPasswordData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    new_password?: string;
    keypass?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, new_password?: string, keypass?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ChangeKeyPasswordResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class ChangeKeystorePasswordData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    new_password?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, new_password?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ChangeKeystorePasswordResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class ExportCertData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    file?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, file?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ExportCertResponse extends T1CResponse {
    data: ExportCertResponseData;
    success: boolean;
    constructor(data: ExportCertResponseData, success: boolean);
}
export declare class ExportCertResponseData {
    alias: string;
    base64?: string;
    path?: string;
    constructor(alias: string, base64?: string, path?: string);
}
export declare class ImportCertData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    file?: string;
    data?: string;
    trustcacerts?: boolean;
    keypass?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, file?: string, data?: string, trustcacerts?: boolean, keypass?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class ImportCertResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class CSRData {
    entity: string;
    type: string;
    keystore: string;
    alias?: string;
    sigalg?: string;
    file?: string;
    keypass?: string;
    dname?: string;
    storepass?: string;
    storetype?: string;
    providername?: string;
    providerclass?: string;
    providerarg?: string;
    providerpath?: string;
    constructor(entity: string, type: string, keystore: string, alias?: string, sigalg?: string, file?: string, keypass?: string, dname?: string, storepass?: string, storetype?: string, providername?: string, providerclass?: string, providerarg?: string, providerpath?: string);
}
export declare class CSRResponse extends T1CResponse {
    data: CSRResponseData;
    success: boolean;
    constructor(data: CSRResponseData, success: boolean);
}
export declare class CSRResponseData {
    base64: string;
    path?: string;
    constructor(base64: string, path?: string);
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
