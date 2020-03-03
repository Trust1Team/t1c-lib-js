import { AbstractJavaKeyTool, ChangeAliasData, ChangeAliasResponse, ChangeKeyPasswordData, ChangeKeyPasswordResponse, ChangeKeystorePasswordData, ChangeKeystorePasswordResponse, CSRData, CSRResponse, DeleteEntryData, DeleteEntryResponse, ExportCertData, ExportCertResponse, GenerateKeyPairData, GenerateKeyPairResponse, ImportCertData, ImportCertResponse, ListEntriesData, ListEntriesResponse } from './JavaKeyToolModel';
import { DataResponse, T1CLibException } from '../../..';
import { LocalConnection } from '../../core/client/Connection';
import { GenericContainer } from '../GenericContainer';
export declare class JavaKeyTool extends GenericContainer implements AbstractJavaKeyTool {
    static CONTAINER_PREFIX: string;
    static GENERATE_KEY_PAIR: string;
    static GENERATE_CERTIFICATE_REQUEST: string;
    static IMPORT_CERTIFICATE: string;
    static EXPORT_CERTIFICATE: string;
    static CHANGE_KEYSTORE_PASSWORD: string;
    static CHANGE_KEY_PASSWORD: string;
    static CHANGE_ALIAS: string;
    static LIST_ENTIRES: string;
    static DELETE_ENTRY: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
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
