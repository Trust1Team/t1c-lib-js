/**
 * @author Maarten Somers
 */

import { OptionalPin } from "../smartcards/Card";
import { RestException } from "../../core/exceptions/CoreExceptions";
import { CertificatesResponse } from "../../core/service/CoreModel";

export { AbstractPkcs11 };

interface AbstractPkcs11 {
    certificates(body: OptionalPin,
                 callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
}