import {
    AbstractJavaKeyTool, ChangeAliasData, ChangeAliasResponse,
    ChangeKeyPasswordData,
    ChangeKeyPasswordResponse,
    ChangeKeystorePasswordData,
    ChangeKeystorePasswordResponse,
    CSRData,
    CSRResponse,
    ExportCertData,
    ExportCertResponse,
    GenerateKeyPairData,
    GenerateKeyPairResponse,
    ImportCertData,
    ImportCertResponse
} from './JavaKeyToolModel';
import {DataResponse, T1CLibException} from '../../..';
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
    static GENERATE_CERTIFICATE_REQUEST = '/certreq​';
    static IMPORT_CERTIFICATE = '/importcert';
    static EXPORT_CERTIFICATE = '/exportcert';
    static CHANGE_KEYSTORE_PASSWORD = '/storepasswd​';
    static CHANGE_KEY_PASSWORD = '/keypasswd​';
    static CHANGE_ALIAS = '/changealias';

    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection) {
        super(baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX);
    }

    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    }

    GenerateCertificateRequest(body: CSRData, callback?: (error: T1CLibException, data: CSRResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_CERTIFICATE_REQUEST), body, undefined, undefined, callback);
    }

    ImportCertificate(body: ImportCertData, callback?: (error: T1CLibException, data: ImportCertResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.IMPORT_CERTIFICATE), body, undefined, undefined, callback);
    }

    ExportCertificate(body: ExportCertData, callback?: (error: T1CLibException, data: ExportCertResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.EXPORT_CERTIFICATE), body, undefined, undefined, callback);
    }

    ChangeKeystorePassword(body: ChangeKeystorePasswordData, callback?: (error: T1CLibException, data: ChangeKeystorePasswordResponse) => void): Promise<DataResponse> {
        let serializedbody = {
            entity: body.entity,
            type: body.type,
            keystore: body.keystore,
            alias: body.alias,
            new: body.new_password,
            storepass: body.storepass,
            storetype: body.storetype,
            providername: body.providername,
            providerclass: body.providerclass,
            providerarg: body.providerarg,
            providerpath: body.providerpath
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEYSTORE_PASSWORD), serializedbody, undefined, undefined, callback);
    }

    ChangeKeyPassword(body: ChangeKeyPasswordData, callback?: (error: T1CLibException, data: ChangeKeyPasswordResponse) => void): Promise<DataResponse> {
        let serializedbody = {
            entity: body.entity,
            type: body.type,
            keystore: body.keystore,
            alias: body.alias,
            new: body.new_password,
            keypass: body.keypass,
            storepass: body.storepass,
            storetype: body.storetype,
            providername: body.providername,
            providerclass: body.providerclass,
            providerarg: body.providerarg,
            providerpath: body.providerpath
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEY_PASSWORD), serializedbody, undefined, undefined, callback);
    }

    ChangeAlias(body: ChangeAliasData, callback?: (error: T1CLibException, data: ChangeAliasResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_ALIAS), body, undefined, undefined, callback);
    }

}
