import { LocalConnection } from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, GenericSecuredCertCard, OptionalPin } from "../../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AbstractEidLUX, AllCertsResponse, BiometricResponse, PictureResponse, SignatureImageResponse } from "./EidLuxModel";
import { AllDataResponse } from "../../pki/luxtrust/LuxTrustModel";
export { EidLux };
declare class EidLux extends GenericSecuredCertCard implements AbstractEidLUX {
    protected url: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    private pin;
    static BIOMETRIC: string;
    static ADDRESS: string;
    static PHOTO: string;
    static SIGNATURE_IMAGE: string;
    constructor(url: string, connection: LocalConnection, reader_id: string, pin: string);
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllCertsResponse) => void): void;
    biometric(body: OptionalPin, callback: (error: RestException, data: BiometricResponse) => void): void;
    picture(body: OptionalPin, callback: (error: RestException, data: PictureResponse) => void): void;
    rootCertificate(body: OptionalPin, callback: (error: RestException, data: DataArrayResponse) => void): void;
    authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
    nonRepudiationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    signatureImage(body: OptionalPin, callback: (error: RestException, data: SignatureImageResponse) => void): void;
}
