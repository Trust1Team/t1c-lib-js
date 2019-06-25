import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard} from '../../Card';
import { AbstractBeLawyer, BeLawyerAllCertificatesResponse, BeLawyerPersonalInfoResponse } from './BeLawyerModel';
import { Options } from '../../../../util/RequestHandler';

const BELAWYER_CERTIFICATE_ROOT = '/certificates/root';
const BELAWYER_CERTIFICATE_SIGN = '/certificates/signing';
const BELAWYER_CERTIFICATE_ISSUER = '/certificates/issuer';
const BELAWYER_CERTIFICATE_AUTHENTICATION = '/certificates/authentication';
const BELAWYER_CERTIFICATE_ALL = '/certificates';
const BELAWYER_PHOTO = '/photo';
const BELAWYER_PERSONAL_INFO = '/personal-info';

export class BeLawyer extends GenericCertCard implements AbstractBeLawyer {
    static CONTAINER_PREFIX = 'diplad';

    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, BeLawyer.CONTAINER_PREFIX);
    }

    public authenticationCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_AUTHENTICATION), undefined, undefined, callback);
    }

    public signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_SIGN), undefined, undefined, callback);
    }

    public issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ISSUER), undefined, undefined, callback);
    }

    public rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ROOT), undefined, undefined, callback);
    }

    public allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ALL), undefined, undefined, callback);
    }

    public personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PERSONAL_INFO), undefined, undefined, callback);
    }

    public photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PHOTO), undefined, undefined, callback);
    }
}
