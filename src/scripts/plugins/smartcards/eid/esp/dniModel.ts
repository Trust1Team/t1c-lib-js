/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";

export { AbstractDNI, AllCertsResponse, AllDataResponse, InfoResponse };


interface AbstractDNI extends SecuredCertCard {
    allData(filters: string[], body: OptionalPin,
            callback?: (error: RestException, data: AllDataResponse) => void): void | Promise<AllDataResponse>;
    allCerts(filters: string[], body: OptionalPin,
             callback?: (error: RestException, data: AllCertsResponse) => void): void | Promise<AllCertsResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): void | Promise<InfoResponse>
    intermediateCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    authenticationCertificate(body: OptionalPin,
                              callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    signingCertificate(body: OptionalPin,
                       callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate?: string
        intermediate_certificate?: string
        signing_certificate?: string
    }
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        authentication_certificate?: string
        intermediate_certificate?: string
        signing_certificate?: string
        info: Info
    }
}

interface InfoResponse extends T1CResponse {
    data: Info
}

interface Info {
    first_name: string
    last_names: string
    national_number: string
    card_number: string
}

