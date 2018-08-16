import {DataResponse, T1CResponse} from '../../core/service/CoreModel';
import {T1CLibException} from '../../core/exceptions/CoreExceptions';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

export interface AbstractJavaKeyTool {
    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse>;
}


export class GenerateKeyPairData {
    constructor(
        public entity: string,
        public type: string,
        public keystore: string,
        public alias?: string,
        public keyalg?: string,
        public sigalg?: string,
        public destalias?: string,
        public dname?: string,
        public startdate?: string,
        public ext?: string,
        public validity?: number,
        public keypass?: string,
        public storepass?: string,
        public storetype?: string,
        public providername?: string,
        public providerclass?: string,
        public providerarg?: string,
        public providerpath?: string
    ) {}
}

export class GenerateKeyPairResponse extends T1CResponse {
    constructor(public data: string, public success: boolean) {
        super(success, data);
    }
}