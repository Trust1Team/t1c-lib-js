import { LocalConnection } from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, OptionalPin } from "../../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AbstractEidLUX, AllCertsResponse, AllDataResponse, BiometricResponse, PictureResponse, SignatureImageResponse } from "./EidLuxModel";
export { EidLux };
declare class EidLux implements AbstractEidLUX {
    private url;
    private connection;
    private reader_id;
    private pin;
    constructor(url: string, connection: LocalConnection, reader_id: string, pin: string);
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    biometric(callback: (error: RestException, data: BiometricResponse) => void): void;
    picture(callback: (error: RestException, data: PictureResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataArrayResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    signatureImage(callback: (error: RestException, data: SignatureImageResponse) => void): void;
    private resolvedReaderURI();
}
