/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericPinCard } from "../Card";
import { DataObject, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { AbstractBelfius } from "./BelfiusModel";

export { Belfius };


const BELFIUS_OPEN_SESSION = "/open-session";
const BELFIUS_COMMAND = "/command";
const BELFIUS_STX = "/stx";
const BELFIUS_CLOSE_SESSION = "/close-session";

class Belfius extends GenericPinCard implements AbstractBelfius {

    public openSession(callback?: (error: RestException, data: DataResponse) => void,
                       agentPort?: number): void | Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI(agentPort) + BELFIUS_OPEN_SESSION, undefined, callback);
    }

    public command(data: DataObject,
                   callback?: (error: RestException, data: DataResponse) => void,
                   agentPort?: number): void | Promise<DataResponse> {
        return this.connection.post(this.resolvedReaderURI(agentPort) + BELFIUS_COMMAND, data, undefined, callback);
    }

    public stx(data: DataObject,
               callback?: (error: RestException, data: DataResponse) => void,
               agentPort?: number): void | Promise<DataResponse> {
        return this.connection.post(this.resolvedReaderURI(agentPort) + BELFIUS_STX, data, undefined, callback);
    }

    public closeSession(callback?: (error: RestException, data: T1CResponse) => void,
                        agentPort?: number): void | Promise<T1CResponse> {
        return this.connection.get(this.resolvedReaderURI(agentPort) + BELFIUS_CLOSE_SESSION, undefined, callback);
    }

}
