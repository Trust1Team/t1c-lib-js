/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificateResponse, DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { Promise } from "es6-promise";
import { Options, RequestHandler } from "../../../../util/RequestHandler";
import { AbstractEidPT, IdDataResponse } from "./EidPtModel";

export { EidPt };


class EidPt extends GenericCertCard implements AbstractEidPT {
    static CERT_ROOT_AUTH = "/root-authentication";
    static CERT_ROOT_NON_REP = "/root-non-repudiation";
    static ID_DATA = "/id";
    static PHOTO = "/photo";


    public idData(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidPt.ID_DATA, undefined, callback);
    }

    public idDataWithOutPhoto(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidPt.ID_DATA, { photo: "false" }, callback);
    }

    public photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidPt.PHOTO, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public rootAuthenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
                                             => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_AUTH, RequestHandler.determineOptions(options, callback));
    }

    public rootNonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
                                             => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_NON_REP, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public nonRepudiationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }
}
