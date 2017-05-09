/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, AllCertsResponse, AllDataResponse, RnDataResponse } from "./EidBeModel";
import { LocalConnection } from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AuthenticateOrSignData, OptionalPin, VerifyPinData } from "../../Card";

const SEPARATOR = "/";
const PLUGIN_CONTEXT_BEID = "/plugins/beid";
const BEID_ALL_CERTIFICATES = "/certificates";
const BEID_RN_DATA = "/rn";
const BEID_ADDRESS = "/address";
const BEID_PHOTO = "/picture";
const BEID_CERT_ROOT = BEID_ALL_CERTIFICATES + "/root";
const BEID_CERT_CITIZEN = BEID_ALL_CERTIFICATES + "/citizen";
const BEID_CERT_AUTHENTICATION = BEID_ALL_CERTIFICATES + "/authentication";
const BEID_CERT_NON_REPUDIATION = BEID_ALL_CERTIFICATES + "/non-repudiation";
const BEID_CERT_RRN = BEID_ALL_CERTIFICATES + "/rrn";
const BEID_VERIFY_PIN = "/verify-pin";
const BEID_SIGN_DATA = "/sign";
const BEID_AUTHENTICATE = "/authenticate";

// property constants
const VERIFY_PRIV_KEY_REF = "non-repudiation";

function createFilter(filters: string[]): { filter: string } {
    return { filter: filters.join(",") };
}


class EidBe implements AbstractEidBE {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_BEID;
    }


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback, createFilter(filters));
        } else { this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback); }
    }

    public rnData(callback: (error: RestException, data: RnDataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + BEID_RN_DATA, callback);
    }

    public address(callback: (error: RestException, data: AddressResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + BEID_ADDRESS, callback);
    }

    public picture(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + BEID_PHOTO, callback);
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + BEID_CERT_ROOT, callback);
    }

    public citizenCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + BEID_CERT_CITIZEN, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  BEID_CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  BEID_CERT_NON_REPUDIATION, callback);
    }

    public rrnCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  BEID_CERT_RRN, callback);
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        let _req: VerifyPinData = { private_key_reference: VERIFY_PRIV_KEY_REF };
        if (body.pin) { _req.pin = body.pin; }
        this.connection.post(this.resolvedReaderURI() + BEID_VERIFY_PIN, _req, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + BEID_SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + BEID_AUTHENTICATE, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { EidBe };
