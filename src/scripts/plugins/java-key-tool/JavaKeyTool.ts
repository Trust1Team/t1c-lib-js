import {AbstractJavaKeyTool, CSRData, CSRResponse, GenerateKeyPairData, GenerateKeyPairResponse} from './JavaKeyToolModel';
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

    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection) {
        super(baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX);
    }

    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    }

    GenerateCertificateRequest(body: CSRData, callback?: (error: T1CLibException, data: CSRResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_CERTIFICATE_REQUEST), body, undefined, undefined, callback);
    }

}