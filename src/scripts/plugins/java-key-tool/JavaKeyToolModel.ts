import {DataResponse, T1CResponse} from '../../core/service/CoreModel';
import {T1CLibException} from '../../core/exceptions/CoreExceptions';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

export interface AbstractJavaKeyTool {
    generateKeyPair(body: GenerateKeyPairData, callback?: (error: T1CLibException, data: GenerateKeyPairResponse) => void): Promise<DataResponse>;
    GenerateCertificateRequest(body: CSRData, callback?: (error: T1CLibException, data: CSRResponse) => void): Promise<DataResponse>;
    ImportCertificate(body: ImportCertData, callback?: (error: T1CLibException, data: ImportCertResponse) => void): Promise<DataResponse>;
    ExportCertificate(body: ExportCertData, callback?: (error: T1CLibException, data: ExportCertResponse) => void): Promise<DataResponse>;
    ChangeKeystorePassword(body: ChangeKeystorePasswordData, callback?: (error: T1CLibException, data: ChangeKeystorePasswordResponse) => void): Promise<DataResponse>;
}

export class ChangeKeystorePasswordData {
    constructor(
        public entity: string,
        public type: string,
        public keystore: string,
        public alias?: string,
        public new_password?: string,
        public keypass?: string,
        public storepass?: string,
        public storetype?: string,
        public providername?: string,
        public providerclass?: string,
        public providerarg?: string,
        public providerpath?: string
    ) {}
}

export class ChangeKeystorePasswordResponse extends T1CResponse {
    constructor(public data: boolean, public success: boolean) {
        super(success, data);
    }
}

export class ExportCertData {
    constructor(
        public entity: string,
        public type: string,
        public keystore: string,
        public alias?: string,
        public file?: string, // file has priority over data
        public storepass?: string,
        public storetype?: string,
        public providername?: string,
        public providerclass?: string,
        public providerarg?: string,
        public providerpath?: string
    ) {}
}

export class ExportCertResponse extends T1CResponse {
    constructor(public data: ExportCertResponseData, public success: boolean) {
        super(success, data);
    }
}

export class ExportCertResponseData {
    constructor(
        public alias: string,
        public base64?: string,
        public path?: string
    ) {}
}


export class ImportCertData {
    constructor(
        public entity: string,
        public type: string,
        public keystore: string,
        public alias?: string,
        public file?: string, // file has priority over data
        public data?: string,
        public trustcacerts?: boolean,
        public keypass?: string,
        public storepass?: string,
        public storetype?: string,
        public providername?: string,
        public providerclass?: string,
        public providerarg?: string,
        public providerpath?: string
    ) {}
}

export class ImportCertResponse extends T1CResponse {
    constructor(public data: boolean, public success: boolean) {
        super(success, data);
    }
}

//  certificate Signing Request (CSR) data
export class CSRData {
    constructor(
        public entity: string,
        public type: string,
        public keystore: string,
        public alias?: string,
        public sigalg?: string,
        public file?: string,
        public keypass?: string,
        public dname?: string,
        public storepass?: string,
        public storetype?: string,
        public providername?: string,
        public providerclass?: string,
        public providerarg?: string,
        public providerpath?: string
    ) {}
}

//  certificate Signing Request (CSR) response
export class CSRResponse extends T1CResponse {
    constructor(public data: CSRResponseData , public success: boolean) {
        super(success, data);
    }
}

export class CSRResponseData {
    constructor(public base64: string, public path?: string) {}
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