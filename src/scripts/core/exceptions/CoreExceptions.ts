/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { GCLClient } from '../GCLLib';

class RestException {
    constructor(public status: number, public code: string, public description: string, public client?: GCLClient) {}
}

export { RestException };
