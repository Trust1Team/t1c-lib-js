/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { AbstractLuxTrust, AllCertsResponse, AllDataResponse } from "./LuxTrustModel";


class LuxTrust extends GenericCertCard implements AbstractLuxTrust {

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(),
            callback,
            LuxTrust.createFilterQueryParam(filters));
        } else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + LuxTrust.ALL_CERTIFICATES, callback, LuxTrust.createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + LuxTrust.ALL_CERTIFICATES, callback); }
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LuxTrust.CERT_ROOT, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LuxTrust.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LuxTrust.CERT_SIGNING, callback);
    }
}

export { LuxTrust };
