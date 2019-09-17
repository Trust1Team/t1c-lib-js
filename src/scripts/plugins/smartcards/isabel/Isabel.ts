import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {DataResponse, DataArrayResponse, CertificateResponse} from '../../../core/service/CoreModel';
import {AbstractIsabel, IsabelAllDataResponse, IsabelSignRequest} from './IsabelModel';
import {GenericReaderContainer} from '../Card';
import {Options, RequestHandler} from '../../../..';

const ISABEL_CARD_ID = '/card-id';
const ISABEL_CERT_ROOT = '/certificates/root';
const ISABEL_CERT_NON_REPUDIATION = '/certificates/signing';
const ISABEL_AUTHENTICATE = '/authenticate';
const ISABEL_SIGN_DATA =  '/sign';

export class Isabel extends GenericReaderContainer implements AbstractIsabel {
    static CONTAINER_PREFIX = 'isabel';

    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string, runInUserSpace: boolean) {
        super(baseUrl, containerUrl, connection, reader_id, Isabel.CONTAINER_PREFIX, runInUserSpace);
    }

    public allDataFilters() {
        return ['card-id'];
    }

    public allData(options: string[] | Options, callback?: (error: T1CLibException, data: IsabelAllDataResponse) => void): Promise<IsabelAllDataResponse> {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params);
    }

    public cardId(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_CARD_ID), undefined, undefined, callback);
    }

    public rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        // tslint:disable-next-line:comment-format
        // Fetching the root should always be done in the admin space as the user has no rights to the admin root cert (stored in the OS root cert store)
        let suffix = this.containerSuffix(ISABEL_CERT_ROOT);
        suffix = suffix.replace('/agent/0', '');

        return this.connection.get(this.baseUrl, suffix, undefined, undefined, callback);
    }

    public nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_CERT_NON_REPUDIATION), undefined, undefined, callback);
    }

    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_AUTHENTICATE), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_SIGN_DATA), undefined, undefined, callback);
    }

    public signData(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(ISABEL_SIGN_DATA), body, undefined, undefined, callback);
    }

    public authenticate(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(ISABEL_AUTHENTICATE), body, undefined, undefined, callback);
    }
}
