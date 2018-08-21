import {
    AbstractJavaKeyTool, ChangeAliasData, ChangeAliasResponse,
    ChangeKeyPasswordData,
    ChangeKeyPasswordResponse,
    ChangeKeystorePasswordData,
    ChangeKeystorePasswordResponse,
    CSRData,
    CSRResponse, DeleteEntryData, DeleteEntryResponse,
    ExportCertData,
    ExportCertResponse,
    GenerateKeyPairData,
    GenerateKeyPairResponse,
    ImportCertData,
    ImportCertResponse, ListEntriesData, ListEntriesResponse
} from './JavaKeyToolModel';
import {DataResponse, PinEnforcer, T1CLibException} from '../../..';
import {LocalConnection} from '../../core/client/Connection';
import {GenericContainer} from '../GenericContainer';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

export class JavaKeyTool extends GenericContainer implements AbstractJavaKeyTool {

    static CONTAINER_PREFIX = 'java-keytool';
    static GENERATE_KEY_PAIR = '/genkeypair';
    static GENERATE_CERTIFICATE_REQUEST = '/certreq';
    static IMPORT_CERTIFICATE = '/importcert';
    static EXPORT_CERTIFICATE = '/exportcert';
    static CHANGE_KEYSTORE_PASSWORD = '/storepasswd';
    static CHANGE_KEY_PASSWORD = '/keypasswd';
    static CHANGE_ALIAS = '/changealias';
    static LIST_ENTIRES = '/list';
    static DELETE_ENTRY = '/delete';

    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection) {
        super(baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX);
    }

    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse> {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    }

    GenerateCertificateRequest(body: CSRData, callback?: (error: T1CLibException, data: CSRResponse) => void): Promise<DataResponse> {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_CERTIFICATE_REQUEST), body, undefined, undefined, callback);
    }

    ImportCertificate(body: ImportCertData, callback?: (error: T1CLibException, data: ImportCertResponse) => void): Promise<DataResponse> {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.IMPORT_CERTIFICATE), body, undefined, undefined, callback);
    }

    ExportCertificate(body: ExportCertData, callback?: (error: T1CLibException, data: ExportCertResponse) => void): Promise<DataResponse> {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.EXPORT_CERTIFICATE), body, undefined, undefined, callback);
    }

    ChangeKeystorePassword(body: ChangeKeystorePasswordData, callback?: (error: T1CLibException, data: ChangeKeystorePasswordResponse) => void): Promise<DataResponse> {
        body.newpass = PinEnforcer.encryptPin(body.newpass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEYSTORE_PASSWORD), body, undefined, undefined, callback);
    }

    ChangeKeyPassword(body: ChangeKeyPasswordData, callback?: (error: T1CLibException, data: ChangeKeyPasswordResponse) => void): Promise<DataResponse> {
        body.newpass = PinEnforcer.encryptPin(body.newpass);
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEY_PASSWORD), body, undefined, undefined, callback);
    }

    ChangeAlias(body: ChangeAliasData, callback?: (error: T1CLibException, data: ChangeAliasResponse) => void): Promise<DataResponse> {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_ALIAS), body, undefined, undefined, callback);
    }

    ListEntries(body: ListEntriesData, callback?: (error: T1CLibException, data: ListEntriesResponse) => void): Promise<DataResponse> {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.LIST_ENTIRES), body, undefined, undefined, callback);
    }

    DeleteEntry(body: DeleteEntryData, callback?: (error: T1CLibException, data: DeleteEntryResponse) => void): Promise<DataResponse> {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.DELETE_ENTRY), body, undefined, undefined, callback);
    }

}
