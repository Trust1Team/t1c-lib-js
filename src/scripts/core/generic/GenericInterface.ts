/**
 * @author Maarten Somers
 * Created on 6/27/17.
 */

import { GCLClient } from "../GCLLib";
import { AuthenticateOrSignData, OptionalPin } from "../../plugins/smartcards/Card";
import { RestException } from "../exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../service/CoreModel";
export { GenericInterface };

interface GenericInterface {
    authenticationCertificates()
    signingCertificates()

    authenticate(client: GCLClient,
                 readerId: string,
                 data: AuthenticateOrSignData,
                 callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>
    sign(client: GCLClient,
         readerId: string,
         data: AuthenticateOrSignData,
         callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>

    verifyPin(client: GCLClient,
              readerId: string,
              data: OptionalPin,
              callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>
}
