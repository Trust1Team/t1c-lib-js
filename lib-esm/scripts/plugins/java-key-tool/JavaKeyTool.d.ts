import { AbstractJavaKeyTool, GenerateKeyPairData, GenerateKeyPairResponse } from './JavaKeyToolModel';
import { DataResponse, T1CLibException } from '../../..';
import { LocalConnection } from '../../core/client/Connection';
import { GenericContainer } from '../GenericContainer';
export declare class JavaKeyTool extends GenericContainer implements AbstractJavaKeyTool {
    static CONTAINER_PREFIX: string;
    static GENERATE_KEY_PAIR: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse>;
}
