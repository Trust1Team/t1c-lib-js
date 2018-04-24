import Certificate from 'pkijs/build/Certificate';
import { RestException } from '../core/exceptions/CoreExceptions';
import { T1CResponse } from '../core/service/CoreModel';
export { CertParser };
declare class CertParser {
    static process(response: any, parseCerts: boolean, callback?: (error: RestException, data: T1CResponse) => void): Promise<any>;
    static processCert(certificate: string): Certificate;
    private static str2ab(str);
    private static setParsed(cert, base64, parseCerts);
}
